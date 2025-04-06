const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 
require('dotenv').config();



const initServer = () => {

  const app = express(); 

  const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection: 'mySession',
  });

  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: 'lax', // or 'none' if on HTTPS and cross-domain
      maxAge: 5*1000, // Time validity of the cookie
    }
  }));

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    }
  });

  io.on("connection", (socket) => {
    console.log("A client connected");
  
    socket.on("frameFromClient", (data) => {
      console.log("Received frame from client:");
  
      if (data) {
          console.log("Frame data received:", data.substring(0, 100)); // Print first 100 chars of the Base64 string
      } else {
          console.log("No data received!");
      }
  
      // Send the decoded frame to connected clients (for real-time display)
      io.emit("frameFromServer", data);
    });
  
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
  
  return { app, server };
}





module.exports = initServer;
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const sharedsession = require('express-socket.io-session');
const cameraSocketHandle = require('../socket/cameraSocketHandle');


const initServer = () => {
  const app = express(); 

  const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection: 'mySession',
  });

  app.use(express.json());
  app.use(cookieParser());


  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));




  const sessionMiddleware = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: 'lax', // or 'none' if on HTTPS and cross-domain
      maxAge: 3600*1000, // Time validity of the cookie
    }
  });

  app.use(sessionMiddleware);
  

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    }
  });
  
  // Share session between Express and Socket.IO
  io.use(sharedsession(sessionMiddleware, {
    autoSave: true
  }));

  cameraSocketHandle(io);
  

  return { app, server };
}

module.exports = initServer;

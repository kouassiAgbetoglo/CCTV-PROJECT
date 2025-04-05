const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const cors = require('cors');
require('dotenv').config();



const store = new MongoDBSession({
  uri: process.env.DATABASE_URL,
  collection: 'mySession',
});

module.exports = (app) => {
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
      maxAge: 5*1000,
    }
  }));
};
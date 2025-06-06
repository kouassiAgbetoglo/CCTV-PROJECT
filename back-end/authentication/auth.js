const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const isAuthenticated = require('../Middleware/isAuthenticated.js');
const authenticateToken = require('../Middleware/authToken.js');

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;


// Check if authentificated
/*
const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
}*/

// Authentication
router.get('/secured-auth', isAuthenticated, (req, res) => {
  return res.json({ message: `${req.session.username} is authenticaed!` });
})

router.get('/protected-route', authenticateToken, (req, res) => {
  return res.json({ message: 'Protected data', user: req.user });
});


// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    return res.status().json({ message: 'Logged out successfully' });
  });
});

router.post('/logout1', authenticateToken, async (req, res) => {

  try {
    // Remove refresh token from database
    const result = await Users.updateOne(
        { username: req.user.username }, 
        { $unset: { refreshToken: 1 } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No refresh token available.' });
    }
      
    return res.status(200).json({ message: 'Logged out successfully' });

  } catch (err) {
    return res.status(500).json({ message: 'Server error during logout' });
  }
});

// JWT Login
router.post('/login1', async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const isUser = await Users.findOne({
      username
    });

      // null

    if (!isUser) {
      return res.status(404).json({ message: 'User does not exists!' });
    }

    const checkPassword = await bcrypt.compare(password, isUser.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Invalid credentials. Login failed.' });
    }

    const name = isUser.name;
    
    // Create access token
    const token = jwt.sign({ username: username }, jwtSecret, { expiresIn: "30m" }); // 15min duration

    // Create refresh token
    const refreshToken = jwt.sign({ username: username }, jwtRefreshSecret, { expiresIn: "1d" }); // 1day duration

    // Update user with refresh token
    const updatedUser = await Users.findOneAndUpdate(
        { username },
        { refreshToken },
        { new: true } 
    );

    // Verify the update
    if (!updatedUser || updatedUser.refreshToken !== refreshToken) {
      return res.status(500).json({ message: 'Failed to update refresh token.' });
    }

    return res.status(200).json({ // A remplacer par 201
      token, 
      refreshToken,
      name
    })
  } catch ( err ) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
})

// Login
router.post('/login', async (req, res) => {

  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const isUser = await Users.findOne({
      username
    });

    if (isUser) {
      const checkPassword = await bcrypt.compare(password, isUser.password);
      if (checkPassword) {
        req.session.isAuth = true;
        req.session.username = username;
        req.session.userId = isUser._id;
        req.session.save(err => {
          if (err) {
              return res.status(500).json({ error: 'Session error' });
          }
        }); // save the session to db

        return res.json({ message: 'Connected.' });
      } else {
        req.session.isAuth = false;
        res.status(401).json({ message: 'Connexion failed' });;
      }
    } else {
      res.status(409).json({ message: 'User does not exist.' });
    }
  } catch ( err ) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
})

// Registration
router.post('/register', async (req, res) => {

    const { name, username, password, email } = req.body;

    if (!username || !password || !email || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        let isUser = await Users.findOne({
            username: username
        });

        if (!isUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({
                username: username,
                password: hashedPassword,
                email: email,
                name: name
            })

            await user.save(); // Add new user to the database
            res.status(201).json({ message: 'User registered successfully.' });
        } else {
            res.json({ message: 'User already exists!' })
        }
    } catch ( err ) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
})

router.post('/register1', authenticateToken, async (req, res) => {

    const { name, username, password, email } = req.body;

    if (!username || !password || !email || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Ajouter plus tard, uniquement les personnes autorisé peuvent creer un compte (admin ...)

    console.log(username);

    try {
        let isUser = await Users.findOne({
            username: username
        });

        if (isUser) {
            return res.status(409).json({ message: 'User already exists!' })
        }

        if (!isUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({
                username: username,
                password: hashedPassword,
                email: email,
                name: name
            })

            await user.save(); // Add new user to the database
            return res.status(201).json({ message: 'User registered successfully.' });
        } 
    } catch ( err ) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
})


module.exports = router;
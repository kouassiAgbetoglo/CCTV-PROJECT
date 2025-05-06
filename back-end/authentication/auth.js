const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const isAuthenticated = require('../Middleware/isAuthenticated.js');

const jwtSecret = process.env.JWT_SECRET;


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
    res.json({ message: `${req.session.username} is authenticaed!` });
})


// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logged out successfully' });
    });
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
            res.status(409).json({ message: 'User does not exists!' });
        }

        const checkPassword = await bcrypt.compare(password, isUser.password);
        if (checkPassword) {
            const token = jwt.sign({ username: isUser.username }, jwtSecret);
            console.log(token);
            return res.status(201).send({ data: token })
        } else {
            res.status(401).json({ message: 'Connexion failed' });;
        }
        
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

        // null

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

    const { username, password, email, name } = req.body;

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


module.exports = router;
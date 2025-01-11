const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');


//
router.get('/', (req, res) =>{
    res.json({Message: 'Pong'});
})

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        let isUser = await Users.findOne({
            username: username
        });

        if (isUser) {
            let checkPassword = await bcrypt.compare(password, isUser.password);
            if (checkPassword) {
                res.send('Success');
            } else {
                res.send('Connexion failed');
            }
        } else {
            res.status(404).json({ message: 'User does not exist.' });
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
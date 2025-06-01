const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../Middleware/authToken.js');


const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;



router.get('/protected-route', authenticateToken, (req, res) => {
	return res.json({ message: 'Protected data', user: req.user });
});

// REGISTRATION
router.post('/register', authenticateToken, async (req, res) => {

	const { name, username, password, email } = req.body;

	if (!username || !password || !email || !name) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	// Ajouter plus tard, uniquement les personnes autorisé peuvent creer un compte (admin ...)
	try {
			const user = await Users.findOne({
				username: username
			});

			if (user) {
				return res.status(409).json({ message: 'User already exists!' })
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new Users({
				username: username,
				password: hashedPassword,
				email: email,
				name: name
			})

			await newUser.save(); 
			return res.status(201).json({ message: 'User registered successfully.' });
	} catch ( err ) {
			res.status(500).json({ message: 'Server error. Please try again later.' });
	}
})


// LOGIN
router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await Users.findOne({
      username
    });

    if (!user) {
      return res.status(404).json({ message: 'User does not exists!' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Invalid credentials. Login failed.' });
    }

    const name = user.name;
    // Create access token
    const token = jwt.sign({ username: username }, jwtSecret, { expiresIn: "15m" }); 
    // Create refresh token
    const refreshToken = jwt.sign({ username: username }, jwtRefreshSecret, { expiresIn: "1h" }); 

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

    console.log("DEBUG")

    return res.status(201).json({
      token, 
      refreshToken,
      name
    });
  } catch ( error ) {
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
})

// LOGOUT
router.post('/logout', authenticateToken, async (req, res) => {

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

module.exports = router;
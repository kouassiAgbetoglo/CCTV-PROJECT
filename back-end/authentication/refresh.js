const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

router.post('/newToken', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        // Verify refresh token
        const checkRefreshToken = jwt.verify(refreshToken, jwtRefreshSecret);
        
        // Check if refresh token exists in database
        const user = await Users.findOne({ 
            username: checkRefreshToken.username, 
            refreshToken 
        });

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Issue new access token
        const newAccessToken = jwt.sign(
            { username: checkRefreshToken.username }, 
            jwtSecret, 
            { expiresIn: '15m' }
        );

        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
});

module.exports = router;
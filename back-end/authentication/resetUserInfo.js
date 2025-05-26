const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const isAuthenticated = require('../Middleware/isAuthenticated.js');
const authenticateToken = require('../Middleware/authToken.js');


router.post('/changeMail', authenticateToken, async (req, res) => {
    const { email, newEmail } = req.body;
    const username = req.user;

    if (!email || !newEmail) {
        return res.status(400).json({ 
            message: 'Both current and new email are required' 
    });
    }

    try {
        const user = await Users.findOne({ username });

        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.email.toLowerCase() !== email.toLowerCase()) {
            return res.status(403).json({
                message: 'The current email you provided is incorrect'
            });
        }

        if (newEmail.toLowerCase() === user.email.toLowerCase()) {
            return res.status(400).json({
                message: 'New email must be different from current email'
            });
        }

        const emailExists = await Users.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(409).json({
                message: 'This email is already associated with another account'
            });
        }


        user.email = newEmail;
        await user.save();
        
        return res.status(200).json({ message: 'Email updated successfully' });

    } catch (error) {
        console.error("Email change error:", error);
        return res.status(500).json({ message: 'Server error. Please try again later' });
    }
});




// Modify password
router.post('/modification-password', isAuthenticated, async (req, res) =>{
    
    const { oldPassword, newPassword, confirmPassword, username } = req.body;

    // Return if fields are missing
    if (!oldPassword || !newPassword || !confirmPassword || !username) {
        return res.status(400).json({ message: "All fields are required"});
    };
    
    // Return if missmatch between newpassword and confirmpassword
    if (newPassword!==confirmPassword) {
        return res.status(400).json({ message: "New Password Mismatch"});
    };

    if (newPassword===oldPassword) {
        return res.status(400).json({ message: "Password already used" });
    }

    try {
        
        const user = await Users.findOne({username});

        if (!user) { // Check if user exist
            return res.status(404).json({ message: "User not found" });
        }

        const checkPassword = await bcrypt.compare(oldPassword, user.password);

        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password Changed with success" });

    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
})




module.exports = router;
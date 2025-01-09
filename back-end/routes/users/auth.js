const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const bcrypt = require('bcrypt');



// Getting all
router.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users); 
    } catch(err) {
        res.status(500).json({ message: err.message });
        // Db error
    }
})

/*
// Getting one
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.name);
})
*/

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
        }
    } catch ( err ) {
        res.status(500).send();
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

            const newUser = await user.save(); // Add new user to the database
            res.status(201).json(newUser);
        } else {
            res.json({ message: 'User already exist!' })
        }
    } catch ( err ) {
        res.status(400).json({ message: err.message });
        // user input wrong
    }
})


// Updating one
router.patch('/', (req, res) => {

})

module.exports = router;
const express = require('express');
const router = express.Router();
const Users = require('../../models/users');



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

router.post('/login', )

// Registration
router.post('/register', async (req, res) => {

    const {username, password, email, name } = req.body;

    if (!username || !password || !email || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        let isUser = await Users.findOne({
            username: username
        });

        if (!isUser) {
            const user = new Users({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name
            })

            const newUser = await user.save();
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
const mongoose = require('../config/db.js');

// Define a subscribers schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    refreshToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Users', userSchema);

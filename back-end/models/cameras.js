const mongoose = require('../config/db.js');


const cameraSchema = new mongoose.Schema({
    cameraName: {
        type: String,
        required: true
    },

    cameraType: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    location : {
        type: String,
        default: null,
    },

    status : {
        type: String,
        default: null,
    },

    activationDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})


module.exports = mongoose.model('Cameras', cameraSchema);
const express = require('express');
const router = express.Router();
const Cameras = require('../models/cameras');
const Users = require('../models/users');
const isAuthenticated = require('../Middleware/isAuthenticated.js');
const { Socket } = require('socket.io');



// Create a new camera for authenticated user
router.post('/create',  async (req, res) => {
  const { cameraName, cameraType } = req.body;

  console.log(req.session.username);

  if (!cameraName || !cameraType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await Users.findOne({ username: req.session.username });
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const newCamera = new Cameras({
      cameraName,
      cameraType,
      owner: user._id,
    });

    await newCamera.save();
    res.status(201).json({ message: 'Camera created successfully.', camera: newCamera });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}); 

router.post('/getID', isAuthenticated, async (req, res) => {

 // Check if this exists
  // retrieve camera ids from db 

  try {
    const cameras = await Cameras.find({ owner: req.session.userId }).select('cameraName -_id')
    .lean(); // Check if user have access to a camera
      
    const cameraList = [];
    
    if (cameras) {
      for (const cam of cameras) {
        cameraList.push(cam.cameraName);
      }
      console.log(`User's camera list ${cameraList}`);
    } else {
      res.status(401).json({ message: 'No camera available'});
    }

    return res.json({ 
      Cameras: cameraList,
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  };

});


/*
router.get('/camera/:name', async (req, res) => {

  try {
      const camera = await Cameras.findOne({ cameraName: req.params.name }).populate('owner');

      if (!camera) {
          return res.status(404).json({ message: 'Camera not found' });
      }

      res.json({
          cameraName: camera.cameraName,
          cameraType: camera.cameraType,
          activationDate: camera.activationDate,
          owner: {
              id: camera.owner._id,
              username: camera.owner.username,
              email: camera.owner.email,
              name: camera.owner.name,
              registrationDate: camera.owner.registrationDate
          }
      });
  } catch (err) {
      console.error('Error fetching camera:', err);
      res.status(500).json({ message: 'Server error' });
  }
});
*/


module.exports = router;

const express = require('express');
const router = express.Router();
const Cameras = require('../models/cameras');
const Users = require('../models/users');



// Create a new camera for authenticated user
router.post('/create',  async (req, res) => {
  const { cameraName, cameraType } = req.body;

  console.log(req.body);

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



module.exports = router;

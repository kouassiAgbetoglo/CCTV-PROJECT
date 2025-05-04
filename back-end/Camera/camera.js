const express = require('express');
const router = express.Router();
const Cameras = require('../models/cameras');
const Users = require('../models/users');
const isAuthenticated = require('../Middleware/isAuthenticated.js');


// Delete camera
router.post('/DeleteCamera', isAuthenticated, async (req, res) => {
  const { cameraName } = req.body;

  console.log(cameraName);

  if (!cameraName) {
    return res.status(400).json({ message: 'Camera name is required..' });
  }

  try {
    const deletedCamera = await Cameras.findOneAndDelete({
      cameraName,
      owner: req.session.userId // ou autre identifiant stocké dans la session
    });

    if (!deletedCamera) {
      return res.status(404).json({ message: 'Camera not found.' });
    }

    res.status(200).json({ message: 'Camera deleted successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }

})

//
// Create a new camera for authenticated user
router.post('/AddNewCamera', isAuthenticated,  async (req, res) => {
  const { cameraName, cameraType } = req.body;

  //console.log(cameraName);

  if (!cameraName || !cameraType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {

    const isCamera = await Cameras.findOne({ cameraName} );
    //console.log(`Camera exists: ${isCamera}`);

    if (isCamera) {
      return res.status(409).json({ message: 'Camera already exist.' });
    }

    const user = await Users.findOne({ username: req.session.username });
    //console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newCamera = new Cameras({
      cameraName,
      cameraType,
      owner: user._id,
    });

    await newCamera.save();
    res.status(201).json({ message: 'Camera created successfully.', camera: newCamera });

  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}); 

router.post('/getID', isAuthenticated, async (req, res) => {

 // Check if this exists
  // retrieve camera ids from db 

  try {
    const cameras = await Cameras.find({ owner: req.session.userId }).select('cameraName -_id').lean(); // CHeck if cameras exist
      
    const cameraList = [];
    
    if (cameras) {
      for (const cam of cameras) {
        cameraList.push(cam.cameraName);
      }
      //console.log(`User's camera list ${cameraList}`);
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

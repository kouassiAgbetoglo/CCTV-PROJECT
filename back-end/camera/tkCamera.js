const express = require('express');
const router = express.Router();
const Cameras = require('../models/cameras.js');
const Users = require('../models/users.js');


const authenticateToken = require('../Middleware/authToken.js');


const getUserId = async (username) => {
  try {
    const user = await Users.findOne({ username:username });

    if (!user) {
      return null;
    }
    return user._id;

  } catch (error) {
    return error.message;
  }
}


router.post('/newcam', authenticateToken, async (req, res) => {
  const { cameraName, cameraType } = req.body;
  const username = req.user;
  
  if (!cameraName || !cameraType) {
    return res.status(400).json({ message: 'Fields are missing.' });
  }

  try {

    const owner = await getUserId(username);

    if (!owner) {
      return res.status(409).json({ message: "User not found. Data inconsistency detected." })
    }

    const camera = await Cameras.findOne({
      cameraName: cameraName,
      owner: owner
    })

    if (camera) {
      return res.status(409).json({ message: "Camera already exists." })
    }

    const newCamera = new Cameras({
      cameraName: cameraName,
      cameraType: cameraType,
      owner: owner
    });

    const addCam = await newCamera.save();

    if (!addCam) {
      return res.status(500).json({ message: "Deletion failted unexpectedly." });
    }

    return res.status(201).json({ message: "Camera created successfully." })
  } catch (error) {
    return res.status(500).json({ message: "Server error. Please try again later." })
  }
})

router.delete('/rm/:camName', authenticateToken, async (req,res)=>{
  const camName = req.params.camName;
  const username = req.user;

  console.log(camName, username);

  if (!camName) {
    return res.status(400).json({message: "Camera name was not provided."});
  }

  try {

    const camera = await Cameras.findOne({
      cameraName: camName,
    });

    if (!camera) {
      return res.status(404).json({message: "Camera not found."});
    }

    const cameraOwner = await Users.findById(camera.owner);

    if (!cameraOwner) {
      return res.status(409).json({ message: "Camera is linked to a non-existent user. Data inconsistency detected." })
    }

    if (cameraOwner.username !== username) {
      return res.status(403).json({ message: "Action blocked. Unauthorized access attempt detected." })
    }

    const rmCam = await Cameras.findOneAndDelete({
      cameraName: camName,
      owner: cameraOwner._id 
    });


    if (!rmCam) {
      return res.status(500).json({ message: "Deletion failted unexpectedly." });
    }

    return res.status(200).json({ message: "Camera deleted successfully!" });

  } catch (error) {
    return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
})


router.get('/getUserCams', authenticateToken, async (req, res) => {
  
  username = req.user;

  try {
    const user = await Users.findOne({ username: username });

    if (!user) {
      return res.status(409).json({ message: "User not found. Data inconsistency detected." })
    }

    const cameras = await Cameras.find({"owner": user._id});

    if (!cameras) {
      res.status(401).json({ message: 'No camera available'});
    }

    const cameraList = [];

    for (const camera of cameras) {
      cameraList.push({
        name: camera.cameraName,
        type: camera.cameraType,
        location: camera.location,
        status: camera.status,
        activationDate: camera.activationDate
      });
    }

    res.status(201).json({
      userCameras: cameraList
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }

})


module.exports = router;

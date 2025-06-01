const express = require('express');
const router = express.Router();
const Cameras = require('../models/cameras');
const Users = require('../models/users');


const isAuthenticated = require('../Middleware/isAuthenticated.js');
const authenticateToken = require('../Middleware/authToken.js');


const getUserId = async (username) => {
  console.log(44)
  try {
    const user = await Users.findOne({ username:username });
    console.log(user);
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
    return res.status(500).json({ message: 'Server error. Please try again later.' });
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

router.get('/getUserCams', authenticateToken, async (req, res) => {
  
  username = req.user;


  try {

    const userId = await getUserId({username: username});

    console.log(username, userId, 45); 

    if (!userId) {
      return res.status(404).json({ message: 'User not found.' });
    }
    

    const cameras = await Cameras.find({"owner": userId});

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
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }

})

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

    return res.status(201).json({ 
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

const Cameras = require('../models/cameras');

const cameraSocketHandle = (io) => {
  io.on("connection", async (socket) => {
    console.log("A client connected");
    
    // Access session data
    const session = socket.handshake.session || socket.request.session;
    let room_id = null;
    let cameraName = null;

    // Retrieve camera name when user connects
    if (session?.userId) {
      try {
        const cameras = await Cameras.find({ owner: session.userId })
          .select('cameraName -_id')
          .lean();
    
        if (cameras.length > 0) {
          const cameraName = cameras[0].cameraName;
          console.log(`User's 100 camera: ${cameraName}`);
    
          if (cameraName) {
            socket.join(cameraName);
            const room_id = cameraName;

            
          }
    
          // You now have access to cameraName here
        }
      } catch (err) {
        console.error("Error fetching cameras:", err);
      }
    }
        
    // Handle explicit room joining
    socket.on("joinRoom", (room) => {
      room_id = room;
      socket.join(cameraName);
      console.log(`Client joined room: ${room_id}`);
    });

    // Handle camera data
    socket.on("dataFromCamera", (data) => {
      if (room_id) {
        // Send to specific room if joined
        io.to(room_id).emit('dataFromCamera', data);
      } else if (cameraName) {
        // Fallback to camera name room
        io.to(cameraName).emit('dataFromCamera', data);
      } else {
        console.log("No room or camera name available");
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected from ${room_id || 'no room'}`);
    });
  });
}

module.exports = cameraSocketHandle;

const cameraSocketHandle = (io) => {
  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("dataFromCamera", (data) => {
      let id = data[0];
      let frame = data[1];
      
      //console.log(`Camera sent frame to room: ${id}`);
      io.to(id).emit('dataFromCamera', frame);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected`);
    });
  });
};

module.exports = cameraSocketHandle;

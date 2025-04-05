
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Create 'images' folder if it doesn't exist
const imagesFolder = path.join(__dirname, 'images');
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder, { recursive: true });
}

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("frameFromClient", (data) => {
    console.log("Received frame from client:");

    if (data) {
        console.log("Frame data received:", data.substring(0, 100)); // Print first 100 chars of the Base64 string
    } else {
        console.log("No data received!");
    }

    // Decode Base64 image
    const base64Data = data.replace(/^data:image\/jpeg;base64,/, ""); // Remove Base64 header if present
    const imageBuffer = Buffer.from(base64Data, 'base64'); // Convert to buffer

    // Define the image path to save in 'images' folder
    const imagePath = path.join(imagesFolder, `frame_${Date.now()}.jpg`);

    // Save the frame as an image file in the 'images' folder
    /*fs.writeFileSync(imagePath, imageBuffer);
    console.log(`Frame saved successfully at ${imagePath}`);*/

    // Send the decoded frame to connected clients (for real-time display)
    io.emit("frameFromServer", data);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

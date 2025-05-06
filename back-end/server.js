require('dotenv').config();
require('./config/db.js');

const InitServer = require('./config/initServer.js');
const { app, server } = InitServer(); // Creates app + HTTP server with Socket.IO

// Routes

// Authentication
const usersRouter = require('./authentication/auth.js');
app.use('/auth/', usersRouter);

// User infos modifications
const userData = require('./authentication/resetUserInfo');
app.use('/reset/', userData);

// Cameras data
const camerasRouter = require('./Camera/camera.js');
app.use('/cam/', camerasRouter);


// Start the HTTP server (not app.listen!)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server with Socket.IO is running on port ${PORT}`);
});

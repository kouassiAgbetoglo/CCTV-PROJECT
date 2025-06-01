require('dotenv').config();
require('./config/db.js');

const InitServer = require('./config/initServer.js');
const { app, server } = InitServer(); // Creates app + HTTP server with Socket.IO

// Routes

// TOKEN ROUTES
// Authentication
const authenticationRoutes = require('./authentication/tkAuth.js');
app.use('/api/authentication', authenticationRoutes);

// Refresh token
const refreshTokenRoutes = require("./authentication/refreshToken.js");
app.use("/api/token", refreshTokenRoutes);

// User 
const userRoutes = require("./user/tkUser");
app.use("/api/users", userRoutes);

//  Camera
const cameraRoutes = require("./camera/tkCamera.js");
app.use("/api/cameras", cameraRoutes);








{/* 
// Authentication
const usersRouter = require('./authentication/auth.js');
app.use('/auth/', usersRouter);

// Refreshtoke
const refreshTokenRouter = require('./authentication/refreshToken.js');
app.use('/refresh', refreshTokenRouter);

// User infos modifications
const userData = require('./authentication/resetUserInfo');
app.use('/reset/', userData);

// Cameras data
const camerasRouter = require('./Camera/camera.js');
app.use('/cam/', camerasRouter);
*/}

// Start the HTTP server (not app.listen!)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server with Socket.IO is running on port ${PORT}`);
});

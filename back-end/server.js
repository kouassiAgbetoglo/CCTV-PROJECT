require('dotenv').config();
require('./config/db.js');

const InitServer = require('./config/initServer.js');
const { app, server } = InitServer(); // Creates app + HTTP server with Socket.IO

// Routes
const usersRouter = require('./authentication/auth.js');
app.use('/auth/', usersRouter);

const camerasRouter = require('./Camera/camera.js');
app.use('/cam/', camerasRouter);

// Start the HTTP server (not app.listen!)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server with Socket.IO is running on port ${PORT}`);
});

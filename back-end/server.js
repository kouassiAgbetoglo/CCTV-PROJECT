const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db'); // Ensure database connection is established

// Middleware
app.use(express.json());


//// Routes
// Users route
const usersRouter = require('./routes/users/auth');
app.use('/', usersRouter);




// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
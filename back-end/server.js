const express = require('express');
require('dotenv').config();
require('./config/db.js');

const app = express();

// Import and apply middleware
require('./config/middleware')(app);

// Routes
const usersRouter = require('./authentication/auth.js');
app.use('/auth/', usersRouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

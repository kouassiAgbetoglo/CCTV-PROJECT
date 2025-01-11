const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/db'); // Ensure database connection is established



// Middleware
app.use(express.json());
app.use(cors());


//// Routes
// Users route
const usersRouter = require('./authentication/auth');
app.use('/auth/', usersRouter); // Bien nommer ses routes !! , ne âs utilser le 

app.get('/ping', (req, res) =>{
  res.json({Message: 'Pong'});
})


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
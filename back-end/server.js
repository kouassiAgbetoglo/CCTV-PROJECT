// This script is for testing purposes only

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const PORT = 5000;

app.use(express.json());

const users = [];

app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add user to the list of users
app.post('/api/users', async (req, res) => {
  try {
    const id = req.body.name; // Retrieve user from the request body
    const password = req.body.password; // Retrieve password from the request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password using bcrypt algorithm
    const user = { user: id, password: hashedPassword };
    users.push(user); // Add user to the list of users
    res.status(201).send();
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Internal Server Error');
  };
});

// Authentication process
app.post('/api/users/login', async (req, res) => {
  id = req.body.id; // Retrieve the user id from the request 
  password = req.body.password; // Retrieve the password from the request
  const user = users.find(user => user.name === id); // Retrieve the user login access from the database
  if (user == null) { // check if user exists in the database
    return res.status(401).send('Cannot find user');
  }

  try {
    if (await bcrypt.compare(password, user.password)) {// If password matches, send a success message
      res.send('Authentication succeeded'); 
    } else {
      res.send('Authentication failed');
    }
  } catch {
    res.status(500).send();
   }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
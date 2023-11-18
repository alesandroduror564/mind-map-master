/* 
   Filename: ComplexWebApp.js
   Description: Code for a complex web application that handles user authentication, database operations, and real-time notifications
*/

// Import necessary modules and libraries
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

// Set up the express app
const app = express();
app.use(bodyParser.json());

// Set up database connection
mongoose.connect('mongodb://localhost/myappdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

// Create a User model using the user schema
const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');
    const token = jwt.sign({ email: user.email }, 'secret_key');
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Middleware to authenticate user's token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected route for authenticated users
app.get('/users/secret', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the secret page, ' + req.user.email });
});

// Set up socket.io server
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const io = socketIo(server);

// Socket.io events
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Example socket event - Send a real-time notification
  socket.on('sendNotification', (data) => {
    console.log('Received notification data:', data);
    socket.broadcast.emit('notification', data);
  });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Export the app for testing purposes
module.exports = app;
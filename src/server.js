const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');  // Corrected declaration
const port = process.env.PORT || 10000;

// Use environment variable for MongoDB connection string
mongoose.connect('mongodb+srv://sasikalam21it:Gd4CeQAoYntoLIBi@cluster0.2tw6imi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:10000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

// Use environment variable for JWT secret
const tokenSecret = process.env.TOKEN_SECRET || 'your-default-secret';

app.post('/signup', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const newUser = new User({
      username,
      email,
      password, // Store the plain text password
      firstName,
      lastName,
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/coachlog', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, tokenSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ... (rest of your routes remain unchanged)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

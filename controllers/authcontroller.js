const User = require('../models/user');

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key_here';

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); // ✅ Add this line to see the exact error
    res.status(500).json({ error: "Server error" });
  }
};

// ---------- LOGIN ----------
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    // Check password (assuming plain text for now; ideally use bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send token to frontend
    res.json({ token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
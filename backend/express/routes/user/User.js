const express = require('express');
const router = express.Router();
const Register = require('../../models/user/Register');
const Login = require('../../models/user/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key (in .env ideally)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// REGISTER
router.post('/register', async (req, res) => {
  const { userName, password, email } = req.body;

  if (!userName || !password || !email) {
    return res.json({ success: false, message: 'All fields are required' });
  }

  const existingUser = await Register.findOne({ userName });
  if (existingUser) {
    return res.json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Register({ userName, password: hashedPassword, email });
  await newUser.save();

  // Optional: auto-login after registration
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '12h' });

  res.json({
    success: true,
    message: 'Registration successful',
    userName: newUser.userName,
    userId: newUser._id,
    token,
    email: newUser.email
  });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  const user = await Register.findOne({ userName });
  if (!user) {
    return res.json({ success: false, message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: 'Invalid username or password' });
  }

  // Save login event
  const newLogin = new Login({ userName, password: user.password, userId: user._id });
  await newLogin.save();

  // Sign JWT
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '12h' });

  res.json({
    success: true,
    message: 'Login successful',
    userName: user.userName,
    userId: user._id,
    token,
    email: user.email
  });
});


router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  const user = await Register.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: 'Email not found' });
  }

    const otp = Math.floor(1000 + ((Date.now() + Math.random()*10000) % 9000));
  console.log(`OTP for ${email}: ${otp}`); // Log OTP for debugging
  res.json({ success: true, message: 'Email sent successfully', OTP: otp });
});     

router.post('/edit', async (req, res) => {
  const { userName, password, email } = req.body;   
    if (!userName || !password || !email) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    const user = await Register.findOne({email});
    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }

    user.userName = userName;
    user.password = await bcrypt.hash(password, 10); // Hash the new password
    await user.save();
    res.json({ success: true, message: 'User details updated successfully' });
}); 


module.exports = router;

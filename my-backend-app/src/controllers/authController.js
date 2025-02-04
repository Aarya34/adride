import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.js';
import passport from 'passport';
import { sendResetEmail } from '../utils/email.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const crypto = require('crypto');

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = new User({ name, email, password, phone, role });
    await user.save();

    req.session.user = user; 
    res.status(201).json({ success: true, message: 'Registration successful', user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }

    req.session.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    res.status(200).json({ success: true, message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
};

export const getProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }
  res.json({ success: true, user: req.session.user });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex'); 
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const emailResponse = await sendResetEmail(user.email, resetToken);
    if (!emailResponse.success) {
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    res.json({ success: true, message: 'Reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const googleAuth = (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' }, async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Authentication failed' });

    const tokens = generateTokens(user);
    res.status(200).json(tokens);
  })(req, res);
};

export const facebookAuth = (req, res) => {
  passport.authenticate('facebook', { failureRedirect: '/login' }, async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Authentication failed' });

    const tokens = generateTokens(user);
    res.status(200).json(tokens);
  })(req, res);
};

export const twitterAuth = (req, res) => {
  passport.authenticate('twitter', { failureRedirect: '/login' }, async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Authentication failed' });

    const tokens = generateTokens(user);
    res.status(200).json(tokens);
  })(req, res);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

export const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};



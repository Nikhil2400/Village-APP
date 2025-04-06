const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register User/Admin
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    console.log(`➡️ Registering ${role}:`, { name, email });

    // ✅ Check if user already exists
    const existingUser = role === 'admin' ? await Admin.findAdminByEmail(email) : await User.findUserByEmail(email);
    
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert into the database
    let result = role === 'admin' 
      ? await Admin.createAdmin(name, email, hashedPassword) 
      : await User.createUser(name, email, hashedPassword);

    if (result?.affectedRows > 0) {
      return res.status(201).json({ success: true, message: 'Registration successful' });
    }
    return res.status(500).json({ success: false, message: 'Registration failed' });
  } catch (error) {
    console.error('❌ Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// ✅ Login User/Admin
const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  console.log(`➡️ Attempting login as ${role} for email: ${email}`);

  try {
    let user = role === 'admin' 
      ? await Admin.findAdminByEmail(email) 
      : await User.findUserByEmail(email);

    if (!user) {
      console.log('❌ User/Admin not found:', email);
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user);

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', isMatch);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '1h' }
    );

    console.log('✅ Generated Token:', token);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

module.exports = { register, login }; 
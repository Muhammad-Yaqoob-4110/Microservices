const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Import the jwt library

// Create a User
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all Users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Login User
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password != password)
      return res.status(401).json({ error: "Invalid credentails" });
    return res.status(200).json({
      message: "Logged in successfully",
      email: email,
      fullname: user.fullname,
      userid: user.id,
      token: GenerateToken(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// Super Admin
async function superUser(req, res) {
  res.json({ message: "Welcome my super user" });
}

// Admin
async function adminUser(req, res) {
  res.json({ message: "Welcome my admin" });
}

// Admin or Super Admin
async function admin_superadmin(req, res) {
  res.json({ message: "Welcome admin/super admin" });
}

// public user
async function publicUser(req, res) {
  res.json({ message: "Welcome public user" });
}

function GenerateToken(user) {
  const payload = {
    role: user.role,
    id: user._id,
  };
  const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
  return token;
}

module.exports = {
  createUser,
  login,
  adminUser,
  admin_superadmin,
  publicUser,
  superUser,
};

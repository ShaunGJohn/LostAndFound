const User = require('../models/User');

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByPk(req.user.id);
  user.name = name || user.name;
  user.phone = phone || user.phone;
  await user.save();
  res.json(user);
};

exports.uploadProfilePicture = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  user.profilePic = `/uploads/${req.file.filename}`;
  await user.save();
  res.json({ profilePic: user.profilePic });
};

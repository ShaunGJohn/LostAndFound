/*const generateItemCode = require('../utils/generateItemCode');

exports.addLostItem = async (req, res) => {
  try {
    const { name, brand, category, date, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await LostItem.create({
      userId: req.user.id,
      itemCode: generateItemCode(),
      name,
      brand,
      category,
      location,
      date,
      imageUrl
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('Error adding lost item:', err);
    res.status(500).json({ message: 'Error adding lost item' });
  }
};

exports.addFoundItem = async (req, res) => {
  try {
    const { name, brand, category, date, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await FoundItem.create({
      userId: req.user.id,
      itemCode: generateItemCode(),
      name,
      brand,
      category,
      location,
      date,
      imageUrl
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('Error adding found item:', err);
    res.status(500).json({ message: 'Error adding found item' });
  }
};


exports.getFoundItems = async (req, res) => {
  console.log("Hello")

}

exports.getLostItems = async (req, res) => {
  console.log("Hello")

}*/


const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const generateItemCode = require('../utils/generateItemCode');

exports.addLostItem = async (req, res) => {
  try {
    const { name, brand, category, date, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await LostItem.create({
      userId: req.user.id,
      itemCode: generateItemCode(),
      name,
      brand,
      category,
      location,
      date,
      imageUrl
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('Error adding lost item:', err);
    res.status(500).json({ message: 'Error adding lost item' });
  }
};

exports.addFoundItem = async (req, res) => {
  try {
    const { name, brand, category, date, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await FoundItem.create({
      userId: req.user.id,
      itemCode: generateItemCode(),
      name,
      brand,
      category,
      location,
      date,
      imageUrl
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('Error adding found item:', err);
    res.status(500).json({ message: 'Error adding found item' });
  }
};






exports.getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching found items:", err);
    res.status(500).json({ message: 'Failed to fetch found items' });
  }
};



exports.getLostItems = async (req, res) => {
  try {
    const items = await LostItem.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).json({ message: 'Failed to fetch lost items' });
  }
};

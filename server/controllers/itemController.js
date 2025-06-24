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


/*

new   


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
*/


const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const generateItemCode = require('../utils/generateItemCode');
const User = require('../models/User');

// GET Lost Items
exports.getLostItems = async (req, res) => {
  try {
    const items = await LostItem.findAll({
      include: [{ model: User, attributes: ['name'], as: 'user' }], // 👈 include user
      order: [['createdAt', 'DESC']]
      
    });
    res.json(items);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).json({ message: "Failed to fetch lost items" });
  }
};

// GET Found Items
exports.getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.findAll({
      include: [{ model: User, attributes: ['name'], as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error("Error fetching found items:", err);
    res.status(500).json({ message: "Failed to fetch found items" });
  }
};

// ADD Lost Item
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

// ADD Found Item
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


// 📌 Get a single item for detail view
exports.getSingleItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const model = type === 'lost' ? LostItem : FoundItem;
    const item = await model.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ message: 'Error fetching item' });
  }
};




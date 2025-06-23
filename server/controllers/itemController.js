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
  console.log("Hello")

}

exports.getLostItems = async (req, res) => {
  console.log("Hello")

}
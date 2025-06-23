/*console.log("🔍 Router resolved from:", require.resolve('express'));


const express = require('express');
const router = express.Router();

const {
  getLostItems,
  getFoundItems,
  addLostItem,
  addFoundItem
} = require('../controllers/itemController');

const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// GET: Fetch Lost and Found items
router.get('/lost', verifyToken, getLostItems);
router.get('/found', verifyToken, getFoundItems);

// POST: Add Lost or Found items with image upload
router.post('/add/lost', verifyToken, upload.single('image'), addLostItem);
router.post('/add/found', verifyToken, upload.single('image'), addFoundItem);

router.get('/user/lost', verifyToken, async (req, res) => {
  const items = await LostItem.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
  res.json(items);
});

router.get('/user/found', verifyToken, async (req, res) => {
  const items = await FoundItem.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
  res.json(items);
});


module.exports = router;
*/

const express = require('express');
const router = express.Router();

const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');


const {
  getLostItems,
  getFoundItems,
  addLostItem,
  addFoundItem,
  getSingleItem
} = require('../controllers/itemController');

const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// GET routes
router.get('/lost', verifyToken, getLostItems);
router.get('/found', verifyToken, getFoundItems);

// POST routes with image upload
router.post('/add/lost', verifyToken, upload.single('image'), addLostItem);
router.post('/add/found', verifyToken, upload.single('image'), addFoundItem);

// Add these at the bottom of itemRoutes.js
router.get('/user/lost', verifyToken, async (req, res) => {
  try {
    const items = await LostItem.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error('Error fetching user lost items:', err);
    res.status(500).json({ message: 'Failed to fetch your lost items' });
  }
});

router.get('/user/found', verifyToken, async (req, res) => {
  try {
    const items = await FoundItem.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error('Error fetching user found items:', err);
    res.status(500).json({ message: 'Failed to fetch your found items' });
  }
});


router.get('/:type/:id', verifyToken, getSingleItem);


module.exports = router;

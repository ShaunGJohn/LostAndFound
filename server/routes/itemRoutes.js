console.log("🔍 Router resolved from:", require.resolve('express'));


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

module.exports = router;

const express = require('express');
const router = express.Router();
const { getUser, updateUser, uploadProfilePicture } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.get('/me', verifyToken, getUser);
router.put('/me', verifyToken, updateUser);
router.post('/me/profile-pic', verifyToken, upload.single('profilePic'), uploadProfilePicture);

module.exports = router;

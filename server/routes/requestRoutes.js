

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {
  sendRequest,
  getReceivedRequests,
  acceptRequest,
  declineRequest,
  createRequest
} = require('../controllers/requestController');

router.post('/send', verifyToken, sendRequest);
router.get('/received', verifyToken, getReceivedRequests);
router.post('/:id/accept', verifyToken, acceptRequest);
router.post('/:id/decline', verifyToken, declineRequest);
router.post('/', verifyToken, createRequest);





module.exports = router;

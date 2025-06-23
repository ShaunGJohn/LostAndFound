//const Request = require('../models/Request');
const { Request, User, LostItem, FoundItem } = require('../models');
//const LostItem = require('../models/LostItem');
//const FoundItem = require('../models/FoundItem');
//const User = require('../models/User');

// 1. Send Request
exports.sendRequest = async (req, res) => {
  try {
    const { targetItemId, type, itemCode } = req.body; // type = 'lost' | 'found'

    let senderItem, receiverItem, senderId, receiverId;

    if (type === 'claim') {
      senderItem = await LostItem.findOne({ where: { itemCode, userId: req.user.id } });
      receiverItem = await FoundItem.findByPk(targetItemId);
    } else {
      senderItem = await FoundItem.findOne({ where: { itemCode, userId: req.user.id } });
      receiverItem = await LostItem.findByPk(targetItemId);
    }

    if (!senderItem || !receiverItem) {
      return res.status(400).json({ message: 'Invalid item code or target item' });
    }

    const existing = await Request.findOne({
      where: {
        senderId: req.user.id,
        lostItemId: type === 'claim' ? senderItem.id : receiverItem.id,
        foundItemId: type === 'claim' ? receiverItem.id : senderItem.id,
      }
    });

    if (existing) return res.status(400).json({ message: 'Request already sent' });

    const request = await Request.create({
      senderId: req.user.id,
      receiverId: receiverItem.userId,
      lostItemId: type === 'claim' ? senderItem.id : receiverItem.id,
      foundItemId: type === 'claim' ? receiverItem.id : senderItem.id,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error('Error sending request:', err);
    res.status(500).json({ message: 'Error sending request' });
  }
};

// 2. Get Received Requests (for profile view)
/*exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { receiverId: req.user.id },
      include: [LostItem, FoundItem, User]
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};
*/
/*
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { receiverId: req.user.id },
      include: [
        { model: LostItem, as: 'lostItem' },
        { model: FoundItem, as: 'foundItem' },
        { model: User, as: 'sender', attributes: ['id', 'name', 'phone', 'email'] }
      ]
    });
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching received requests:", err);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};*/


exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { receiverId: req.user.id },
      include: [
        { model: User, as: 'sender', attributes: ['name', 'email', 'phone'] },
        { model: LostItem, as: 'lostItem' },
        { model: FoundItem, as: 'foundItem' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching received requests:", err);
    res.status(500).json({ message: "Error fetching received requests" });
  }
};



// 3. Accept Request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request || request.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized or request not found' });
    }
    request.status = 'accepted';
    await request.save();
    res.json({ message: 'Request accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to accept request' });
  }
};

// 4. Decline Request
exports.declineRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request || request.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized or request not found' });
    }
    request.status = 'declined';
    await request.save();
    res.json({ message: 'Request declined' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to decline request' });
  }
};

/*
exports.createRequest = async (req, res) => {
  try {
    const { lostItemId, foundItemId } = req.body;

    if (!lostItemId && !foundItemId) {
      return res.status(400).json({ message: 'Either lostItemId or foundItemId is required.' });
    }

    const senderId = req.user.id;

    // You must decide how to get receiverId — this is a placeholder
    // In real usage, you'd fetch the lost/found item and get its userId
    const receiverId = null; // TODO: Set this properly

    const newRequest = await Request.create({
      senderId,
      receiverId,
      lostItemId: lostItemId || null,
      foundItemId: foundItemId || null,
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('❌ Error creating request:', err);
    res.status(500).json({ message: 'Failed to create request' });
  }
};
*/
/*
exports.createRequest = async (req, res) => {
  try {
    const { lostItemId, foundItemId } = req.body;
    const request = await Request.create({
      senderId: req.user.id,
      receiverId: req.body.receiverId, // make sure this is passed from frontend
      lostItemId,
      foundItemId,
      status: 'pending'
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ message: 'Error creating request' });
  }
};*/



exports.createRequest = async (req, res) => {
  try {
    const { lostItemId, foundItemId } = req.body;

    // Determine which direction the request is going
    const isClaiming = !!lostItemId;
    const isFounding = !!foundItemId;

    let senderId = req.user.id;
    let receiverId;

    // 🔍 Load the item from DB to get its owner
    if (isClaiming) {
      const FoundItem = require('../models/FoundItem');
      const foundItem = await FoundItem.findByPk(foundItemId);
      if (!foundItem) return res.status(404).json({ message: 'Found item not found' });
      receiverId = foundItem.userId; // ✅ receiver is the one who posted the found item
    } else if (isFounding) {
      const LostItem = require('../models/LostItem');
      const lostItem = await LostItem.findByPk(lostItemId);
      if (!lostItem) return res.status(404).json({ message: 'Lost item not found' });
      receiverId = lostItem.userId; // ✅ receiver is the one who posted the lost item
    } else {
      return res.status(400).json({ message: 'Either lostItemId or foundItemId must be provided' });
    }

    // ✅ Now we have senderId and receiverId
    const newRequest = await Request.create({
      senderId,
      receiverId,
      lostItemId: lostItemId || null,
      foundItemId: foundItemId || null,
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ message: 'Failed to create request' });
  }
};

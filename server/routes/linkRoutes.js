const express = require('express');
const router = express.Router();
const { createLink, getLinks, getLinkById } = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createLink);
router.get('/', protect, getLinks);
router.get('/:id', protect, getLinkById);

module.exports = router;

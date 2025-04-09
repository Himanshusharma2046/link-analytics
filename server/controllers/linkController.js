const Link = require('../models/Link');
const generateShortUrl = require('../utils/generateShortUrl');
const useragent = require('useragent');

// @desc    Create a new short link
// @route   POST /api/links
// @access  Private
const createLink = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    
    // Generate short URL or use custom alias
    let shortUrl = customAlias || generateShortUrl();
    
    // Check if custom alias is already in use
    if (customAlias) {
      const existingLink = await Link.findOne({ shortUrl: customAlias });
      if (existingLink) {
        return res.status(400).json({ message: 'Custom alias already in use' });
      }
    }
    
    const link = await Link.create({
      originalUrl,
      shortUrl,
      userId: req.user._id,
      expiresAt: expiresAt || null,
    });
    
    res.status(201).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all links for a user
// @route   GET /api/links
// @access  Private
const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user._id });
    res.json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get link by ID
// @route   GET /api/links/:id
// @access  Private
const getLinkById = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    // Check if the link belongs to the user
    if (link.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Redirect to original URL
// @route   GET /:shortUrl
// @access  Public
const redirectToUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl });
    
    if (!link) {
      return res.status(404).json({ message: 'URL not found' });
    }
    
    // Check if link is expired
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).json({ message: 'Link has expired' });
    }
    
    // Parse user agent
    const agent = useragent.parse(req.headers['user-agent']);
    
    // Log click data asynchronously
    const clickData = {
      timestamp: new Date(),
      ip: req.ip,
      device: agent.device.toString(),
      browser: agent.toAgent(),
      os: agent.os.toString(),
      location: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };
    
    // Update link with click data
    link.clicks.push(clickData);
    await link.save();
    
    // Redirect to original URL
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
    createLink, 
    getLinks, 
    getLinkById, 
    redirectToUrl 
  };

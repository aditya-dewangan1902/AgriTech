const express = require('express');
const router = express.Router();
const { PublishedPaper, Submission, User } = require('../models');

// Get all published papers
router.get('/papers', async (req, res) => {
  try {
    const papers = await PublishedPaper.findAll({
      include: [
        { 
          model: Submission, 
          include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
        }
      ],
      order: [['publicationDate', 'DESC']]
    });
    res.json(papers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single published paper by ID
router.get('/papers/:id', async (req, res) => {
  try {
    const paper = await PublishedPaper.findByPk(req.params.id, {
      include: [
        { 
          model: Submission, 
          include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName', 'email', 'affiliation'] }]
        }
      ]
    });
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    // Increment view count
    paper.views += 1;
    await paper.save();
    
    res.json(paper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Submission, PublishedPaper, Revision, Comment, SubmissionLog } = require('../models');

const JWT_SECRET = 'your_jwt_secret_key_change_in_production';

// Admin auth middleware
const adminAuth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- USER MANAGEMENT ---

// GET all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET single user
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST create user (admin-only)
router.post('/users', adminAuth, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, affiliation, country } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    user = await User.create({ firstName, lastName, email, password: hashedPassword, role: role || 'author', affiliation, country });
    const result = user.get({ plain: true });
    delete result.password;
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT update user
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { firstName, lastName, email, role, affiliation, country, status, password } = req.body;
    const updateData = { firstName, lastName, email, role, affiliation, country, status };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    await user.update(updateData);
    const updated = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- ADMIN PROFILE ---

// GET admin profile
router.get('/profile', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT update admin profile
router.put('/profile', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { firstName, lastName, affiliation, country } = req.body;
    await user.update({ firstName, lastName, affiliation, country });
    const updated = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- SUBMISSIONS MANAGEMENT ---

// GET all submissions
router.get('/submissions', adminAuth, async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET single submission
router.get('/submissions/:id', adminAuth, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['firstName', 'lastName', 'email', 'affiliation'] },
        { model: Revision, as: 'revisions' },
        { model: Comment, as: 'comments' },
        { model: SubmissionLog, as: 'logs' }
      ]
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT update submission status and reviewer comments
router.put('/submissions/:id', adminAuth, async (req, res) => {
  try {
    const { status, reviewerComments } = req.body;
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    
    const updates = {};
    if (status && status !== submission.status) {
      updates.status = status;
      await SubmissionLog.create({
        submissionId: submission.id,
        status: status,
        description: `(Status updated to ${status})`
      });
    }
    if (reviewerComments !== undefined) updates.reviewerComments = reviewerComments;
    
    await submission.update(updates);
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST new comment
router.post('/submissions/:id/comments', adminAuth, async (req, res) => {
  try {
    const { text, revId } = req.body;
    const submissionId = req.params.id;
    
    const submission = await Submission.findByPk(submissionId);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    const comment = await Comment.create({
      submissionId,
      revisionId: revId,
      authorName: `${req.user.firstName} ${req.user.lastName}`,
      role: req.user.role,
      text,
      avatar: req.user.firstName.charAt(0)
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE revision
router.delete('/submissions/revisions/:revId', adminAuth, async (req, res) => {
  try {
    const revision = await Revision.findByPk(req.params.revId);
    if (!revision) return res.status(404).json({ message: 'Revision not found' });
    
    await revision.destroy();
    res.json({ message: 'Revision deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE submission
router.delete('/submissions/:id', adminAuth, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    await submission.destroy();
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- PUBLICATION ---

// GET all published papers
router.get('/publications', adminAuth, async (req, res) => {
  try {
    const papers = await PublishedPaper.findAll({
      include: [{ model: Submission, include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }] }],
      order: [['publicationDate', 'DESC']]
    });
    res.json(papers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST publish a paper
router.post('/publish', adminAuth, async (req, res) => {
  try {
    const { submissionId, doi, volume, issue, pdfUrl } = req.body;
    
    const submission = await Submission.findByPk(submissionId);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    // Check if already published
    const existing = await PublishedPaper.findOne({ where: { submissionId } });
    if (existing) return res.status(400).json({ message: 'Paper already published' });

    const published = await PublishedPaper.create({
      submissionId,
      doi,
      volume: parseInt(volume),
      issue: parseInt(issue),
      pdfUrl: pdfUrl || null
    });

    await submission.update({ status: 'Published' });

    res.status(201).json(published);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE published paper
router.delete('/publications/:id', adminAuth, async (req, res) => {
  try {
    const paper = await PublishedPaper.findByPk(req.params.id);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });
    
    // Also revert submission status
    const submission = await Submission.findByPk(paper.submissionId);
    if (submission) await submission.update({ status: 'Accepted' });
    
    await paper.destroy();
    res.json({ message: 'Publication removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

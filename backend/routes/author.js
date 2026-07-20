const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Submission, User, PublishedPaper, Revision, Comment, SubmissionLog } = require('../models');

const JWT_SECRET = 'your_jwt_secret_key_change_in_production';

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET author profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update author profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, affiliation, country } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ firstName, lastName, affiliation, country });
    const updated = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET all submissions for current author
router.get('/submissions', auth, async (req, res) => {
  try {
    const submissions = await Submission.findAll({ 
      where: { authorId: req.user.id },
      include: [{ model: PublishedPaper }],
      order: [['createdAt', 'DESC']]
    });
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET single submission for author
router.get('/submissions/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findOne({ 
      where: { id: req.params.id, authorId: req.user.id },
      include: [
        { model: PublishedPaper },
        { model: User, as: 'author', attributes: ['firstName', 'lastName', 'affiliation'] },
        { model: Revision, as: 'revisions' },
        { model: Comment, as: 'comments' },
        { model: SubmissionLog, as: 'logs' }
      ]
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create new submission
router.post('/submissions', auth, async (req, res) => {
  try {
    const { title, abstract, keywords } = req.body;
    const newSubmission = await Submission.create({
      title,
      category: req.body.category || 'Uncategorized',
      abstract,
      keywords,
      authorId: req.user.id,
      status: 'Under Review'
    });
    
    await SubmissionLog.create({
      submissionId: newSubmission.id,
      status: 'Under Review',
      description: '(Original Manuscript submitted)'
    });
    res.status(201).json(newSubmission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update own submission (only if Under Review)
router.put('/submissions/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      where: { id: req.params.id, authorId: req.user.id }
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    
    const { title, category, abstract, keywords } = req.body;
    await submission.update({ title, category, abstract, keywords });
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST new comment
router.post('/submissions/:id/comments', auth, async (req, res) => {
  try {
    const { text, revId } = req.body;
    const submissionId = req.params.id;
    
    const submission = await Submission.findOne({
      where: { id: submissionId, authorId: req.user.id }
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    const comment = await Comment.create({
      submissionId,
      revisionId: revId,
      authorName: `${req.user.firstName} ${req.user.lastName} (Author)`,
      role: 'author',
      text,
      avatar: req.user.firstName.charAt(0)
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST new revision
router.post('/submissions/:id/revisions', auth, async (req, res) => {
  try {
    const { versionName, fileName, fileUrl } = req.body;
    const submissionId = req.params.id;
    
    const submission = await Submission.findOne({
      where: { id: submissionId, authorId: req.user.id }
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    const revision = await Revision.create({
      submissionId,
      versionName,
      fileName,
      fileUrl
    });

    await SubmissionLog.create({
      submissionId,
      status: 'Pending',
      description: `(${versionName} submitted)`
    });

    res.status(201).json(revision);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE own submission (only if Under Review or Revision)
router.delete('/submissions/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      where: { id: req.params.id, authorId: req.user.id }
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    if (['Accepted', 'Published'].includes(submission.status)) {
      return res.status(403).json({ message: 'Cannot delete an accepted or published submission' });
    }
    await submission.destroy();
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

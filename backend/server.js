const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { sequelize } = require('./models');
const { User, Submission, PublishedPaper, Revision, Comment, SubmissionLog } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/author', require('./routes/author'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/public', require('./routes/public'));

const PORT = process.env.PORT || 5000;

// =============================================
// DATABASE SEED FUNCTION
// Seeds dummy users, submissions, and published
// papers so all pages show real data immediately.
// Uses findOrCreate so re-starts are safe.
// =============================================
async function seedDatabase() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // --- Seed Users ---
  const [adminUser] = await User.findOrCreate({
    where: { email: 'admin123@agritech.com' },
    defaults: {
      firstName: 'Admin',
      lastName: 'AgriTech',
      email: 'admin123@agritech.com',
      password: hashedPassword,
      role: 'admin',
      affiliation: 'AgriTech Journal',
      country: 'India'
    }
  });

  const [author1] = await User.findOrCreate({
    where: { email: 'author123@agritech.com' },
    defaults: {
      firstName: 'D. Z.',
      lastName: 'Khan',
      email: 'author123@agritech.com',
      password: hashedPassword,
      role: 'author',
      affiliation: 'University of AgriTech',
      country: 'India'
    }
  });

  const [author2] = await User.findOrCreate({
    where: { email: 'alice@agritech.com' },
    defaults: {
      firstName: 'Alice',
      lastName: 'Green',
      email: 'alice@agritech.com',
      password: hashedPassword,
      role: 'author',
      affiliation: 'State University Labs',
      country: 'USA'
    }
  });

  const [author3] = await User.findOrCreate({
    where: { email: 'bob@agritech.com' },
    defaults: {
      firstName: 'Bob',
      lastName: 'Farmer',
      email: 'bob@agritech.com',
      password: hashedPassword,
      role: 'author',
      affiliation: 'Agri-Robotics Institute',
      country: 'UK'
    }
  });

  const [author4] = await User.findOrCreate({
    where: { email: 'charlie@agritech.com' },
    defaults: {
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@agritech.com',
      password: hashedPassword,
      role: 'author',
      affiliation: 'Global Agri Research Center',
      country: 'Australia'
    }
  });

  // --- Seed Submissions ---
  const [sub1] = await Submission.findOrCreate({
    where: { title: 'Generative Models for Synthetic Data Augmentation in Crop Disease Diagnosis' },
    defaults: {
      title: 'Generative Models for Synthetic Data Augmentation in Crop Disease Diagnosis',
      abstract: 'This paper presents a novel approach to addressing the scarcity of annotated agricultural image data by employing advanced generative adversarial networks (GANs). We demonstrate that synthetically augmenting datasets of diseased crop leaves improves the diagnostic accuracy of downstream classification models by up to 18%, particularly for rare diseases where real-world data collection is challenging.',
      keywords: 'Generative Models, Synthetic Data, Crop Disease, Deep Learning',
      status: 'Published',
      authorId: author1.id
    }
  });

  const [sub2] = await Submission.findOrCreate({
    where: { title: 'Energy-Efficient Edge Computing for Real-Time Soil Analysis' },
    defaults: {
      title: 'Energy-Efficient Edge Computing for Real-Time Soil Analysis',
      abstract: 'Continuous soil monitoring using IoT sensors generates massive amounts of data, creating bottlenecks in cloud transmission. This study proposes an energy-efficient edge computing framework deployed directly on smart agricultural sensors. By processing moisture, pH, and nitrogen data locally, we achieved a 75% reduction in data transmission overhead while maintaining real-time alert capabilities for automated irrigation systems.',
      keywords: 'Edge Computing, Soil Analysis, IoT, Smart Farming, Energy Efficiency',
      status: 'Published',
      authorId: author2.id
    }
  });

  const [sub3] = await Submission.findOrCreate({
    where: { title: 'Digital Twins in Horticulture: A Simulation Approach to Resource Optimization' },
    defaults: {
      title: 'Digital Twins in Horticulture: A Simulation Approach to Resource Optimization',
      abstract: 'Digital Twins offer a virtual representation of physical farming environments. This research develops a comprehensive digital twin for a commercial greenhouse, integrating live telemetry from climate control and fertigation systems. Using reinforcement learning algorithms applied to the simulation, the system autonomously optimized light exposure and nutrient delivery schedules, resulting in a 12% yield increase and a 20% reduction in water usage over a single growing season.',
      keywords: 'Digital Twins, Horticulture, Simulation, Resource Optimization, AI',
      status: 'Published',
      authorId: author3.id
    }
  });

  const [sub4] = await Submission.findOrCreate({
    where: { title: 'Blockchain Traceability for Organic Crop Certification' },
    defaults: {
      title: 'Blockchain Traceability for Organic Crop Certification',
      abstract: 'This paper investigates the application of blockchain distributed ledger technology to create an immutable and transparent certification trail for organic agricultural produce. The proposed system significantly reduces fraud in organic supply chains.',
      keywords: 'Blockchain, Supply Chain, Organic, Certification',
      status: 'Under Review',
      authorId: author2.id
    }
  });

  const [sub5] = await Submission.findOrCreate({
    where: { title: 'Precision Agriculture using IoT Sensors and Drone Imagery' },
    defaults: {
      title: 'Precision Agriculture using IoT Sensors and Drone Imagery',
      abstract: 'We present an integrated precision agriculture system combining ground-level IoT sensor networks with high-resolution drone imagery for comprehensive crop health monitoring and targeted intervention.',
      keywords: 'IoT, Drones, Precision Agriculture, Remote Sensing',
      status: 'Major Revision',
      authorId: author3.id
    }
  });

  const [sub6] = await Submission.findOrCreate({
    where: { title: 'Automated Irrigation Systems using Machine Learning' },
    defaults: {
      title: 'Automated Irrigation Systems using Machine Learning',
      abstract: 'This research develops a machine learning-based automated irrigation controller that learns from historical yield data, weather patterns, and real-time soil sensors to optimize water delivery for maximum crop output with minimum water waste.',
      keywords: 'Machine Learning, Irrigation, Automation, Water Management',
      status: 'Accepted',
      authorId: author4.id
    }
  });

  // --- Seed Published Papers (for submissions that are Published) ---
  await PublishedPaper.findOrCreate({
    where: { doi: '10.AgriTech/2025.10.001' },
    defaults: {
      submissionId: sub1.id,
      doi: '10.AgriTech/2025.10.001',
      volume: 1,
      issue: 2,
      publicationDate: new Date('2025-10-15'),
      views: 2154,
      downloads: 895
    }
  });

  await PublishedPaper.findOrCreate({
    where: { doi: '10.AgriTech/2025.09.042' },
    defaults: {
      submissionId: sub2.id,
      doi: '10.AgriTech/2025.09.042',
      volume: 1,
      issue: 1,
      publicationDate: new Date('2025-09-22'),
      views: 1842,
      downloads: 620
    }
  });

  await PublishedPaper.findOrCreate({
    where: { doi: '10.AgriTech/2025.08.115' },
    defaults: {
      submissionId: sub3.id,
      doi: '10.AgriTech/2025.08.115',
      volume: 1,
      issue: 1,
      publicationDate: new Date('2025-08-10'),
      views: 3055,
      downloads: 1204
    }
  });

  // --- Seed Revisions, Comments, and Logs (for dynamic UI) ---
  // Seed for sub1 (Published)
  const [sub1Rev1] = await Revision.findOrCreate({
    where: { submissionId: sub1.id, versionName: 'rev_1' },
    defaults: {
      submissionId: sub1.id,
      versionName: 'rev_1',
      fileName: 'Final_Manuscript.pdf',
      fileUrl: '#',
      uploadedAt: new Date('2025-10-10')
    }
  });

  await Revision.findOrCreate({
    where: { submissionId: sub1.id, versionName: 'rev_0' },
    defaults: {
      submissionId: sub1.id,
      versionName: 'rev_0',
      fileName: 'Original_Submission.pdf',
      fileUrl: '#',
      uploadedAt: new Date('2025-08-01')
    }
  });

  await Comment.findOrCreate({
    where: { submissionId: sub1.id, text: 'Excellent improvements. Accepted.' },
    defaults: {
      submissionId: sub1.id,
      revisionId: 'rev_1',
      authorName: 'Editor Admin',
      role: 'admin',
      text: 'Excellent improvements. Accepted.',
      avatar: 'E',
      createdAt: new Date('2025-10-12')
    }
  });

  await SubmissionLog.findOrCreate({
    where: { submissionId: sub1.id, status: 'Published' },
    defaults: {
      submissionId: sub1.id,
      status: 'Published',
      description: '(Paper officially published)',
      createdAt: new Date('2025-10-15')
    }
  });

  // Seed for sub4 (Under Review)
  await Revision.findOrCreate({
    where: { submissionId: sub4.id, versionName: 'rev_0' },
    defaults: {
      submissionId: sub4.id,
      versionName: 'rev_0',
      fileName: 'Original_Manuscript_1004.pdf',
      fileUrl: '#',
      uploadedAt: new Date('2025-10-20')
    }
  });

  await Comment.findOrCreate({
    where: { submissionId: sub4.id, text: 'The methodology is sound, but the dataset used seems small. Can the authors comment on the generalizability of their findings?' },
    defaults: {
      submissionId: sub4.id,
      revisionId: 'rev_0',
      authorName: 'Reviewer A',
      role: 'reviewer',
      text: '1. The introduction clearly outlines the problem.\n2. The methodology is sound, but the dataset used seems small. Can the authors comment on the generalizability of their findings?\n3. Section 4.2: Please clarify the parameters used for the baseline model comparison.',
      avatar: 'A',
      createdAt: new Date('2025-10-21')
    }
  });

  await SubmissionLog.findOrCreate({
    where: { submissionId: sub4.id, status: 'Under Review' },
    defaults: {
      submissionId: sub4.id,
      status: 'Under Review',
      description: '(Assigned to reviewers)',
      createdAt: new Date('2025-10-21')
    }
  });

  console.log('✅ Database seeded with dummy users, submissions, and published papers');
  console.log('');
  console.log('🔑 Login Credentials:');
  console.log('   Admin:  admin123@agritech.com  / password123');
  console.log('   Author: author123@agritech.com / password123');
  console.log('   Author: alice@agritech.com     / password123');
}

// Sync DB and start server
sequelize.sync({ force: false }).then(async () => {
  console.log('✅ Database synced');
  await seedDatabase();
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});

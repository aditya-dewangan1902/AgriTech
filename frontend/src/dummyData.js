export const DUMMY_PAPERS = [
  { 
    id: 'dummy1', 
    volume: 1, 
    issue: 1, 
    publicationDate: new Date().toISOString(), 
    doi: '10.AgriTech/2025.10.001',
    views: '2,154',
    downloads: '895',
    Submission: { 
      title: 'Generative Models for Synthetic Data Augmentation in Crop Disease Diagnosis', 
      author: { firstName: 'D. Z.', lastName: 'Khan & Al.', affiliation: 'University of AgriTech' }, 
      keywords: 'Generative Models, Synthetic Data, Crop Disease, Deep Learning',
      abstract: 'This paper presents a novel approach to addressing the scarcity of annotated agricultural image data by employing advanced generative adversarial networks (GANs). We demonstrate that synthetically augmenting datasets of diseased crop leaves improves the diagnostic accuracy of downstream classification models by up to 18%, particularly for rare diseases where real-world data collection is challenging.' 
    } 
  },
  { 
    id: 'dummy2', 
    volume: 1, 
    issue: 1, 
    publicationDate: new Date().toISOString(), 
    doi: '10.AgriTech/2025.09.042',
    views: '1,842',
    downloads: '620',
    Submission: { 
      title: 'Energy-Efficient Edge Computing for Real-Time Soil Analysis', 
      author: { firstName: 'R. S.', lastName: 'Miller', affiliation: 'State University Labs' }, 
      keywords: 'Edge Computing, Soil Analysis, IoT, Smart Farming, Energy Efficiency',
      abstract: 'Continuous soil monitoring using IoT sensors generates massive amounts of data, creating bottlenecks in cloud transmission. This study proposes an energy-efficient edge computing framework deployed directly on smart agricultural sensors. By processing moisture, pH, and nitrogen data locally, we achieved a 75% reduction in data transmission overhead while maintaining real-time alert capabilities for automated irrigation systems.' 
    } 
  },
  { 
    id: 'dummy3', 
    volume: 1, 
    issue: 1, 
    publicationDate: new Date().toISOString(), 
    doi: '10.AgriTech/2025.08.115',
    views: '3,055',
    downloads: '1,204',
    Submission: { 
      title: 'Digital Twins in Horticulture: A Simulation Approach to Resource Optimization', 
      author: { firstName: 'S. O.', lastName: 'Adegoke & Col.', affiliation: 'Agri-Robotics Institute' }, 
      keywords: 'Digital Twins, Horticulture, Simulation, Resource Optimization, AI',
      abstract: 'Digital Twins offer a virtual representation of physical farming environments. This research develops a comprehensive digital twin for a commercial greenhouse, integrating live telemetry from climate control and fertigation systems. Using reinforcement learning algorithms applied to the simulation, the system autonomously optimized light exposure and nutrient delivery schedules, resulting in a 12% yield increase and a 20% reduction in water usage over a single growing season.' 
    } 
  }
];

export const DUMMY_SUBMISSIONS = [
  {
    id: 'dummy_sub1',
    title: 'Generative Models for Synthetic Data Augmentation in Crop Disease Diagnosis',
    keywords: 'Generative Models, Synthetic Data, Crop Disease, Deep Learning',
    abstract: 'This paper presents a novel approach to addressing the scarcity of annotated agricultural image data by employing advanced generative adversarial networks (GANs).',
    status: 'Published',
    submissionDate: new Date('2025-09-15').toISOString(),
    createdAt: new Date('2025-09-15').toISOString(),
    updatedAt: new Date('2025-10-15').toISOString(),
    reviewerComments: 'Thank you for addressing the reviewers\' concerns. We are pleased to accept your manuscript for publication.',
    author: { firstName: 'D. Z.', lastName: 'Khan', email: 'author123@agritech.com', affiliation: 'University of AgriTech' }
  },
  {
    id: 'dummy_sub2',
    title: 'Blockchain Traceability for Organic Crop Certification',
    keywords: 'Blockchain, Supply Chain, Organic',
    abstract: 'This paper investigates the application of blockchain distributed ledger technology to create an immutable and transparent certification trail for organic agricultural produce.',
    status: 'Under Review',
    submissionDate: new Date('2025-10-20').toISOString(),
    createdAt: new Date('2025-10-20').toISOString(),
    updatedAt: new Date('2025-10-22').toISOString(),
    reviewerComments: null,
    author: { firstName: 'Alice', lastName: 'Green', email: 'alice@agritech.com', affiliation: 'State University Labs' }
  },
  {
    id: 'dummy_sub3',
    title: 'Precision Agriculture using IoT Sensors and Drone Imagery',
    keywords: 'IoT, Drones, Precision Agriculture',
    abstract: 'We present an integrated precision agriculture system combining ground-level IoT sensor networks with high-resolution drone imagery.',
    status: 'Major Revision',
    submissionDate: new Date('2025-10-01').toISOString(),
    createdAt: new Date('2025-10-01').toISOString(),
    updatedAt: new Date('2025-10-28').toISOString(),
    reviewerComments: 'The methodology is sound, but the dataset used for validation is too small.',
    author: { firstName: 'Bob', lastName: 'Farmer', email: 'bob@agritech.com', affiliation: 'Agri-Robotics Institute' }
  },
  {
    id: 'dummy_sub4',
    title: 'Automated Irrigation Systems using Machine Learning',
    keywords: 'Machine Learning, Irrigation, Automation',
    abstract: 'This research develops a machine learning-based automated irrigation controller that learns from historical yield data.',
    status: 'Accepted',
    submissionDate: new Date('2025-09-25').toISOString(),
    createdAt: new Date('2025-09-25').toISOString(),
    updatedAt: new Date('2025-10-30').toISOString(),
    reviewerComments: 'Excellent work. The paper is accepted.',
    author: { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@agritech.com', affiliation: 'Global Agri Research Center' }
  }
];

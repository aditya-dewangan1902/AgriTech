import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookLock, Cpu, ChevronRight, Edit3 } from 'lucide-react';
import api from '../api';
import { DUMMY_PAPERS } from '../dummyData';

const Home = () => {
  const [latestPapers, setLatestPapers] = useState([]);

  useEffect(() => {
    const fetchLatestPapers = async () => {
      try {
        const res = await api.get('/public/papers');
        if (res.data && res.data.length > 0) {
          setLatestPapers(res.data.slice(0, 3));
        } else {
          setLatestPapers(DUMMY_PAPERS.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
        setLatestPapers(DUMMY_PAPERS.slice(0, 3));
      }
    };
    fetchLatestPapers();
  }, []);

  // Featured papers: static like original (4 cards)
  const featuredPapers = [
    {
      id: 'dummy1',
      title: 'Deep Learning for Real-Time Pest Detection in Vineyards',
      authors: 'Smith J., Chen L., Garcia M.',
      abstract: 'Abstract: This study explores the application of convolutional neural networks (CNNs) for precise and rapid identification of common vineyard pests...'
    },
    {
      id: 'dummy2',
      title: 'IoT Sensors and Big Data for Optimized Water Management',
      authors: 'Kaur P., Rodriguez A., Patel S.',
      abstract: 'Abstract: We propose a sensor network architecture integrated with big data analytics to generate predictive irrigation models...'
    },
    {
      id: 'dummy3',
      title: 'Autonomous Robotic Harvesting: Efficiency and Cost Analysis',
      authors: 'Lee Y., Akbari F.',
      abstract: 'Abstract: An in-depth evaluation of current agricultural robotics for harvesting delicate crops, focusing on improved efficiency algorithms...'
    },
    {
      id: 'dummy_sub2',
      title: 'Blockchain Traceability Systems for Organic Supply Chains',
      authors: 'Wang X., Johnson R.',
      abstract: 'Abstract: Implementing decentralized ledger technology to enhance transparency and prevent fraud in the high-value organic agriculture sector...'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary-dark to-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="merriweather text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Advancing Agriculture Through AI &amp; Computing
          </h1>
          <p className="text-xl sm:text-2xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
            The premier source for peer-reviewed research linking computational science, machine learning, and agricultural innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              to="/guidelines"
              className="bg-white text-primary font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl text-lg text-center transition-transform transform hover:scale-105"
            >
              Submit Your Paper
            </Link>
            <Link
              to="/papers"
              className="border border-white/80 text-white font-medium py-3.5 px-8 rounded-lg text-lg text-center hover:bg-white hover:text-primary transition-colors"
            >
              Browse All Papers
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex items-center justify-center md:justify-start p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md">
              <Award className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Peer-Reviewed</h3>
                <p className="text-sm text-text-secondary">Rigorous academic standards for high-quality research.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-center justify-center md:justify-center p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md">
              <BookLock className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Open Access</h3>
                <p className="text-sm text-text-secondary">Freely accessible research to accelerate global innovation.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-center justify-center md:justify-end p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md">
              <Cpu className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">AI &amp; ML Focus</h3>
                <p className="text-sm text-text-secondary">Dedicated to computational science in agriculture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Papers Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="merriweather text-3xl sm:text-4xl font-bold text-text-primary mb-3">Featured Research Papers</h2>
            <div className="w-10 h-1 mx-auto bg-primary rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPapers.map((paper) => (
              <div key={paper.id} className="paper-card-transition bg-white border border-[#E0E0E0] rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-primary mb-1 hover:underline cursor-pointer line-clamp-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-1">{paper.authors}</p>
                  <p className="text-sm text-text-primary line-clamp-3">{paper.abstract}</p>
                </div>
                <Link
                  to={`/papers/${paper.id}`}
                  className="mt-4 w-full text-center bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary-dark"
                >
                  View Paper
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/papers"
              className="border border-primary text-primary font-medium py-3 px-8 rounded-lg text-base hover:bg-primary hover:text-white transition-colors"
            >
              View All Papers
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Publications Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">

            <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="merriweather text-3xl sm:text-4xl font-bold text-text-primary mb-4">Latest Publications</h2>
              <div className="w-10 h-1 bg-primary rounded mb-6 mx-auto lg:mx-0"></div>
              <p className="text-lg text-text-secondary mb-8">
                Explore the most recent articles from Volume 1, Issue 2, covering breakthroughs in generative AI, edge computing, and digital twins.
              </p>
              <Link
                to="/papers"
                className="border border-primary text-primary font-medium py-3 px-8 rounded-lg text-base hover:bg-primary hover:text-white transition-colors"
              >
                View All Publications
              </Link>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {latestPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="group py-4 px-6 bg-white border border-[#E5E5E5] rounded-lg transition-all duration-200 hover:bg-green-50 hover:shadow-md flex items-center justify-between"
                >
                  <div className="flex-grow">
                    <Link
                      to={`/papers/${paper.id}`}
                      className="text-base font-medium text-primary hover:underline line-clamp-1"
                    >
                      {paper.Submission?.title}
                    </Link>
                    <p className="text-sm text-text-secondary mt-1">
                      {paper.Submission?.author?.firstName} {paper.Submission?.author?.lastName} | {new Date(paper.publicationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary ml-4 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Edit3 className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="merriweather text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Share Your Research With the World
          </h2>
          <p className="text-xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
            AgriTech is actively seeking high-quality submissions. Join us in shaping the future of agriculture.
          </p>
          <Link
            to="/guidelines"
            className="bg-white text-primary font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl text-lg text-center transition-transform transform hover:scale-105"
          >
            View Submission Guidelines
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;

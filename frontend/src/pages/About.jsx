import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h1 className="merriweather text-4xl font-bold text-gray-800 mb-3">About AgriTech</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advancing the field of agriculture through the intersection of computation, artificial intelligence, and biological science.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <article className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-dark mb-4 merriweather">Our Mission</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The Journal of Advanced Computing and AI in Agriculture (AgriTech) is a premier, peer-reviewed, open-access journal dedicated to publishing high-quality, original research at the intersection of computer science and agricultural technology.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to accelerate global outreach and facilitate the transparent exchange of knowledge to foster sustainable, efficient, and intelligent farming solutions worldwide. We aim to bridge the gap between computational scientists, engineers, and agricultural researchers, providing a platform for innovations that address the critical challenges of modern food production.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-dark mb-4 merriweather">Aims & Scope</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                AgriTech invites submissions of research articles, review papers, and technical notes that explore the application of advanced computing and artificial intelligence to agriculture. Key topics include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Machine Learning and Deep Learning for crop/pest detection</li>
                <li>Agricultural Robotics and Autonomous Systems</li>
                <li>IoT Sensor Networks for smart farming</li>
                <li>Big Data Analytics for yield prediction and resource management</li>
                <li>Computer Vision in agriculture</li>
                <li>Blockchain for supply chain traceability</li>
                <li>Climate-Smart Agriculture modeling</li>
              </ul>
            </section>
          </article>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-primary-dark mb-4 merriweather">Editorial Board</h2>
            <p className="text-gray-700 mb-8">
              AgriTech is supported by a dedicated team of internationally recognized researchers and experts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/editorial/evelyn-reed" className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 transform block">
                <img className="w-full h-56 object-cover" src="https://placehold.co/500x500/006633/FFFFFF?text=Dr.+R" alt="Dr. Evelyn Reed" />
                <div className="p-5 text-center">
                  <h4 className="text-lg font-bold text-gray-800 merriweather group-hover:text-primary transition-colors">Dr. Evelyn Reed</h4>
                  <p className="text-sm text-primary font-medium">Editor-in-Chief</p>
                  <p className="text-sm text-gray-500 mt-1">Wageningen University, Netherlands</p>
                </div>
              </Link>
              <Link to="/editorial/kenji-tanaka" className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 transform block">
                <img className="w-full h-56 object-cover" src="https://placehold.co/500x500/006633/FFFFFF?text=Prof.+T" alt="Prof. Kenji Tanaka" />
                <div className="p-5 text-center">
                  <h4 className="text-lg font-bold text-gray-800 merriweather group-hover:text-primary transition-colors">Prof. Kenji Tanaka</h4>
                  <p className="text-sm text-primary font-medium">Associate Editor (AI/ML)</p>
                  <p className="text-sm text-gray-500 mt-1">University of Tokyo, Japan</p>
                </div>
              </Link>
              <Link to="/editorial/samuel-adebayo" className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 transform block">
                <img className="w-full h-56 object-cover" src="https://placehold.co/500x500/006633/FFFFFF?text=Dr.+A" alt="Dr. Samuel Adebayo" />
                <div className="p-5 text-center">
                  <h4 className="text-lg font-bold text-gray-800 merriweather group-hover:text-primary transition-colors">Dr. Samuel Adebayo</h4>
                  <p className="text-sm text-primary font-medium">Associate Editor (Robotics)</p>
                  <p className="text-sm text-gray-500 mt-1">MIT, USA</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default About;

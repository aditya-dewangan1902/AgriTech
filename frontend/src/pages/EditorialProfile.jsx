import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EditorialProfile = () => {
  return (
    <div className="bg-gray-50 flex-grow">
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            <h1 className="merriweather text-4xl font-bold text-gray-900 mb-3">Editorial Board</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated team of internationally recognized researchers and experts who guide AgriTech's commitment to quality and innovation.
            </p>
            <Link to="/about" className="inline-flex items-center text-primary hover:text-primary-dark mt-6 group font-medium">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to About Page
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="md:col-span-1">
                <img src="https://placehold.co/500x500/006633/FFFFFF?text=Dr.+E+R" alt="Portrait of Dr. Evelyn Reed" className="rounded-lg shadow-lg w-full object-cover aspect-square" />
              </div>
              <div className="md:col-span-3">
                <h2 className="merriweather text-3xl font-bold text-gray-900 mb-2">Dr. Evelyn Reed</h2>
                <p className="text-xl text-primary font-medium -mt-2 mb-2">Editor-in-Chief</p>
                <p className="text-lg text-gray-600 font-medium mb-6">Wageningen University, Netherlands</p>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dr. Evelyn Reed is a leading expert in agricultural systems and data science. With over 20 years of experience, her research focuses on integrating machine learning models with crop simulation to enhance food security and sustainability. She has published extensively in leading journals and has been an invited speaker at numerous international conferences. As Editor-in-Chief, she guides the journal's mission to publish transformative and rigorous research that bridges the gap between computational science and practical agriculture.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Education</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>PhD in Agricultural Engineering, Cornell University</li>
                <li>M.S. in Data Science, Stanford University</li>
                <li>B.S. in Agronomy, Wageningen University</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Publications</h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>Reed, E. (2024). 'Predictive Modeling for Climate-Resilient Agriculture.' Nature Food.</li>
                <li>Reed, E., & Chen, L. (2023). 'Sensor Fusion in Smart Farming: A 10-Year Review.' Journal of Agricultural Science.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="h-px bg-gray-300 my-8"></div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="md:col-span-1">
                <img src="https://placehold.co/500x500/006633/FFFFFF?text=Prof.+K+T" alt="Portrait of Prof. Kenji Tanaka" className="rounded-lg shadow-lg w-full object-cover aspect-square" />
              </div>
              <div className="md:col-span-3">
                <h2 className="merriweather text-3xl font-bold text-gray-900 mb-2">Prof. Kenji Tanaka</h2>
                <p className="text-xl text-primary font-medium -mt-2 mb-2">Associate Editor (AI/ML)</p>
                <p className="text-lg text-gray-600 font-medium mb-6">University of Tokyo, Japan</p>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Professor Kenji Tanaka is a pioneer in the application of deep learning and computer vision for agricultural applications. His work on real-time pest detection and automated plant phenotyping is globally recognized. He oversees the AI/ML track for AgriTech, ensuring rigorous standards for computational contributions. His lab at the University of Tokyo collaborates with several ag-tech startups, bringing research from the bench to the field.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Education</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>PhD in Computer Science, University of Tokyo</li>
                <li>M.S. in Artificial Intelligence, Kyoto University</li>
                <li>B.Eng. in Information Systems, Osaka University</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Publications</h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>Tanaka, K. (2024). 'Generative Adversarial Networks for Synthetic Crop Disease Imagery.' IEEE Transactions on AI.</li>
                <li>Tanaka, K., & Patel, S. (2022). 'Lightweight CNNs for Edge-Based Pest Detection.' Journal of Smart Agriculture.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="h-px bg-gray-300 my-8"></div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="md:col-span-1">
                <img src="https://placehold.co/500x500/006633/FFFFFF?text=Dr.+S+A" alt="Portrait of Dr. Samuel Adebayo" className="rounded-lg shadow-lg w-full object-cover aspect-square" />
              </div>
              <div className="md:col-span-3">
                <h2 className="merriweather text-3xl font-bold text-gray-900 mb-2">Dr. Samuel Adebayo</h2>
                <p className="text-xl text-primary font-medium -mt-2 mb-2">Associate Editor (Robotics)</p>
                <p className="text-lg text-gray-600 font-medium mb-6">MIT, USA</p>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dr. Samuel Adebayo's research is at the forefront of agricultural robotics and autonomous systems. He specializes in developing robots for delicate harvesting, soil sampling, and autonomous navigation in unstructured farm environments. He brings a wealth of practical and theoretical knowledge to the journal's robotics section. Dr. Adebayo is also the recipient of the 'Innovations in Robotics' award for his work on soft robotics for grape harvesting.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Education</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>PhD in Robotics, MIT</li>
                <li>M.S. in Mechanical Engineering, Carnegie Mellon University</li>
                <li>B.S. in Electrical Engineering, University of Lagos</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Recent Publications</h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>Adebayo, S. (2024). 'A Tactile Feedback System for Robotic Strawberry Harvesting.' Science Robotics.</li>
                <li>Adebayo, S., & Reed, E. (2023). 'Multi-Robot SLAM in Orchard Environments.' Journal of Field Robotics.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorialProfile;

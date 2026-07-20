import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const SubmissionGuidelines = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h1 className="merriweather text-4xl font-bold text-gray-800 mb-3">Submission Guidelines</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know to prepare and submit your manuscript to AgriTech.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Manuscript Preparation</h2>
                <p className="text-gray-600 mb-4">Manuscripts must be submitted in English and formatted according to our standard template. The typical length is 5,000 to 8,000 words.</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Use a standard font (e.g., Times New Roman, 12pt).</li>
                  <li>Double-space all text.</li>
                  <li>Include an abstract of 150-250 words.</li>
                  <li>Provide 4-6 keywords.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Process</h2>
                <p className="text-gray-600 mb-4">All submissions undergo a rigorous double-blind peer review process.</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Initial editorial screening (1-2 weeks).</li>
                  <li>Peer review by at least two independent experts (4-6 weeks).</li>
                  <li>Author revision if required (up to 4 weeks).</li>
                  <li>Final decision.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Publication Timeline</h2>
                <p className="text-gray-600 mb-4">We strive for rapid publication while maintaining high standards.</p>
                <p className="text-gray-600">Accepted papers are typically published online within 2 weeks of final acceptance.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <Link to="/login" className="inline-block bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
               Go to Author Portal
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubmissionGuidelines;

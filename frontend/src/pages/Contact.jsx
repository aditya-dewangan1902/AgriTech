import { Mail, FileCheck, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h1 className="merriweather text-4xl font-bold text-gray-800 mb-3">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are here to assist with inquiries regarding submissions, publications, and general journal matters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <aside className="lg:col-span-1 space-y-8">
              <h2 className="merriweather text-3xl font-bold text-gray-800">Contact Details</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 merriweather">Editorial Support</h3>
                    <p className="text-gray-600 mb-1">For general inquiries and support.</p>
                    <a href="mailto:support@agritech.org" className="text-primary font-medium hover:underline text-lg">support@agritech.org</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FileCheck className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 merriweather">Submission Inquiries</h3>
                    <p className="text-gray-600 mb-1">Questions about your manuscript or the review process.</p>
                    <a href="mailto:editor@agritech.org" className="text-primary font-medium hover:underline text-lg">editor@agritech.org</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 merriweather">Mailing Address</h3>
                    <p className="text-gray-600 mb-1">AgriTech Editorial Office<br />123 Academic Way, Ag-Tech City, World, 00000</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
              <h2 className="merriweather text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                    <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white">
                    <option>General Inquiry</option>
                    <option>Submission Status Question</option>
                    <option>Peer Review Question</option>
                    <option>Website Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Your Message</label>
                  <textarea rows="6" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3.5 px-7 rounded-lg shadow-lg hover:shadow-xl text-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-[1.02]">
                  Submit Inquiry
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

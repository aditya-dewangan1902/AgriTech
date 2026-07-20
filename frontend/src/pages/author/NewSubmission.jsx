import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FilePlus, AlertTriangle, FileUp, FileCheck, X, UserPlus, Trash2, Send } from 'lucide-react';
import api from '../../api';

const NewSubmission = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [coAuthors, setCoAuthors] = useState([]);
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/author/submissions', { title, abstract, keywords });
      navigate('/author/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting paper');
    }
  };

  const addAuthor = () => {
    setCoAuthors([...coAuthors, { id: Date.now(), name: '', affiliation: '' }]);
  };

  const removeAuthor = (id) => {
    setCoAuthors(coAuthors.filter(a => a.id !== id));
  };

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1 flex items-center">
          <FilePlus className="w-7 h-7 mr-3 text-primary" /> Submit New Manuscript
        </h1>
        <p className="text-lg text-[#555555]">
          Complete the steps below. Please review the <Link to="/guidelines" className="text-primary hover:underline font-medium">Submission Guidelines</Link> first.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-[#E5E5E5] space-y-8">
        <section>
          <h2 className="merriweather text-2xl font-bold text-primary mb-4 pb-2 border-b">1. Upload Manuscript (PDF Only)</h2>
          <p className="text-sm text-red-600 mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" /> IMPORTANT: The PDF MUST be blinded (no author identification) for peer review.
          </p>

          {!file ? (
            <div className="flex flex-col items-center justify-center p-12 rounded-lg cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors relative">
              <FileUp className="w-10 h-10 text-primary mb-3" />
              <p className="text-lg font-semibold text-primary mb-2">Drag and drop your PDF here</p>
              <p className="text-sm text-[#555555]">or click to select file (Max size: 10MB)</p>
              <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required onChange={(e) => setFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="mt-4 p-3 border border-green-300 bg-green-50 rounded-lg text-sm text-green-800 flex justify-between items-center">
              <span className="flex items-center">
                <FileCheck className="w-4 h-4 mr-2" />
                <span className="font-medium">{file.name}</span>
              </span>
              <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 font-medium p-1 rounded-full hover:bg-red-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        <section className="space-y-5">
          <h2 className="merriweather text-2xl font-bold text-primary mb-4 pb-2 border-b">2. Enter Paper Metadata</h2>
          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">Paper Title (Full)</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="A Novel Sensor Fusion Framework for Precision Irrigation" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">Abstract (Max 250 words)</label>
            <textarea rows="6" value={abstract} onChange={e => setAbstract(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="Provide a concise summary of your research, methods, and key findings."></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Primary Research Category</label>
              <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                <option value="" disabled selected>Select a field</option>
                <option>AI/ML</option>
                <option>Computer Vision</option>
                <option>IoT & Smart Farming</option>
                <option>Blockchain</option>
                <option>Big Data Analytics</option>
                <option>Robotics</option>
                <option>Climate-Smart Agriculture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Keywords (Comma Separated)</label>
              <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="e.g., deep learning, drone imagery, yield prediction" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">Optional Notes / Comments for the Editor</label>
            <textarea rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="e.g., Conflicts of interest, suggestions for reviewers."></textarea>
          </div>
        </section>

        <section>
          <h2 className="merriweather text-2xl font-bold text-primary mb-4 pb-2 border-b">3. Author & Affiliation Details</h2>
          <p className="text-sm text-[#555555] mb-4">You ({user?.firstName} {user?.lastName}) are the corresponding author by default. Add co-authors below, ensuring correct order.</p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-primary">1. {user?.firstName} {user?.lastName} (Corresponding Author)</p>
              <p className="text-sm text-[#555555]">Affiliation: {user?.affiliation || 'Not specified'}</p>
            </div>
            
            {coAuthors.map((author, index) => (
              <div key={author.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm flex flex-col md:flex-row gap-3">
                <div className="flex-grow space-y-2">
                  <label className="block text-xs font-medium text-gray-600">Co-Author {index + 2} Name</label>
                  <input type="text" placeholder="e.g., M. Chen" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm" />
                  <label className="block text-xs font-medium text-gray-600">Affiliation</label>
                  <input type="text" placeholder="e.g., State University" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm" />
                </div>
                <button type="button" onClick={() => removeAuthor(author.id)} className="flex-shrink-0 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors self-start md:self-center">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={addAuthor} className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center">
            <UserPlus className="w-4 h-4 mr-2" /> Add Co-Author
          </button>
        </section>

        <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold text-xl hover:bg-primary-dark transition-colors flex items-center justify-center shadow-lg hover:shadow-xl">
          <Send className="w-6 h-6 mr-3" /> Finalize & Submit Paper
        </button>
      </form>
    </>
  );
};

export default NewSubmission;

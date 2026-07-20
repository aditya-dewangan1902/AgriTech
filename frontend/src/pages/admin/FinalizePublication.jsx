import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileCheck2, Download, CheckCheck, Slash } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api';

const AdminFinalizePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doi, setDoi] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await api.get(`/admin/submissions/${id}`);
        setSubmission(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubmission();
  }, [id]);

  const generateDoi = () => {
    setDoi(`10.1234/agritech.v${volume || 1}.i${issue || 1}.${id}`);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/publish', { submissionId: id, doi, volume, issue });
      alert('Paper published successfully!');
      navigate('/admin/submissions');
    } catch (err) {
      alert(err.response?.data?.message || 'Error publishing paper');
    }
  };

  if (!submission) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <div>
          <Link to={`/admin/submissions/${id}`} className="text-primary hover:underline mb-2 flex items-center text-sm font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Submission Review
          </Link>
          <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1">
            Finalize Publication Details
          </h1>
          <p className="text-lg text-[#555555]">
            Review and assign final metadata before publishing.
          </p>
        </div>
      </header>

      <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5E5E5] space-y-4">
            <h2 className="merriweather text-xl font-bold text-primary pb-2 border-b">Submission Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Title</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" value={submission.title} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Author (Name & Affiliation)</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" value={`${submission.author?.firstName} ${submission.author?.lastName} (${submission.author?.affiliation})`} readOnly />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Submission ID</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" value={id} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" value={submission.keywords} readOnly />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5E5E5] space-y-4">
            <h2 className="merriweather text-xl font-bold text-primary pb-2 border-b">Editable Metadata</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
              <textarea rows="6" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" defaultValue={submission.abstract} readOnly></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                <input type="number" value={volume} onChange={e => setVolume(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="e.g., 8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
                <input type="number" value={issue} onChange={e => setIssue(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="e.g., 2" />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">DOI (Digital Object Identifier)</label>
                  <button type="button" onClick={generateDoi} className="text-xs text-primary font-medium hover:underline focus:outline-none">Auto-generate</button>
                </div>
                <input type="text" value={doi} onChange={(e) => setDoi(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder={`e.g., 10.1234/agritech.v8.i2.${id}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5E5E5]">
            <h2 className="merriweather text-xl font-bold text-primary pb-2 border-b mb-4">Accepted File</h2>
            <div className="flex flex-col items-start bg-green-50 p-4 rounded-lg border border-green-200 space-y-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <FileCheck2 className="w-6 h-6 text-green-700 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-green-800 break-words">Revision 1 - Blockchain_Traceability.pdf</p>
                  <p className="text-sm text-green-600">This is the final accepted version for publication.</p>
                </div>
              </div>
              <button type="button" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm flex items-center justify-center space-x-2 flex-shrink-0">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5E5E5]">
            <h2 className="merriweather text-xl font-bold text-red-600 pb-2 border-b mb-4">Publication Status</h2>
            <p className="text-sm text-gray-600 mb-5">
              Publish the paper to make it live on the journal, or unpublish it to remove it from public view.
            </p>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <CheckCheck className="w-5 h-5" />
              <span>Finalize and Publish Paper</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminFinalizePublication;

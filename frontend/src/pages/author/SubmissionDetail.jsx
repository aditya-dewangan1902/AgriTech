import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Edit2,
  Trash2,
  Save,
  Send,
  Clock,
  Edit,
  Check,
  FileText,
  AlertTriangle
} from 'lucide-react';
import api from '../../api';
import { DUMMY_SUBMISSIONS } from '../../dummyData';



export default function AuthorSubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data & Edit State
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [revisions, setRevisions] = useState([]);
  const [comments, setComments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  
  // Interaction State
  const [commentFilter, setCommentFilter] = useState('all');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  
  // Modal & Deletion State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await api.get(`/author/submissions/${id}`);
        setSubmission(res.data);
        setFormData(res.data);
        setRevisions(res.data.revisions || []);
        setComments(res.data.comments || []);
        setTimeline(res.data.logs || []);
      } catch (err) {
        const dummy = DUMMY_SUBMISSIONS.find(s => String(s.id) === String(id)) || DUMMY_SUBMISSIONS[0];
        if (dummy) {
          setSubmission(dummy);
          setFormData(dummy);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id]);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 4000);
  };

  const handleEditClick = () => {
    setFormData(submission);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setFormData(submission);
    setIsEditMode(false);
  };

  const handleSaveChanges = async () => {
    try {
      await api.put(`/author/submissions/${id}`, formData);
      setSubmission(formData);
      setIsEditMode(false);
      showToast('Submission details saved successfully!');
    } catch (err) {
      showToast('Failed to save changes.', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('submission-', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/author/submissions/${id}`);
      setIsDeleteModalOpen(false);
      setIsDeleted(true);
      showToast('Submission deleted successfully.');
    } catch (err) {
      showToast('Failed to delete submission.', 'error');
      setIsDeleteModalOpen(false);
    }
  };

  const renderComments = () => {
    const filteredComments = commentFilter === 'all' 
      ? comments 
      : comments.filter(c => c.revId === commentFilter);

    if (filteredComments.length === 0) {
      return <p className="text-gray-500 italic">No comments found.</p>;
    }

    let lastRevId = null;

    return filteredComments.map((comment, index) => {
      const showHeader = comment.revisionId !== lastRevId;
      lastRevId = comment.revisionId;
      const revisionName = revisions.find(r => r.versionName === comment.revisionId)?.versionName || comment.revisionId;

      return (
        <React.Fragment key={`comment-${comment.id}`}>
          {showHeader && (
            <h3 className="comment-revision-header mt-4 first:mt-0 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md inline-block mb-3">
              Comments on: {revisionName}
            </h3>
          )}
          <div className="comment-block mb-6">
            <div className="flex items-start space-x-3">
              <div className={`${comment.role === 'editor' ? 'bg-[#006633]' : 'bg-gray-500'} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
                {comment.avatar}
              </div>
              <div className="flex-grow">
                <div className="comment-bubble p-4 text-sm max-w-full bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className={`font-semibold ${comment.role === 'editor' ? 'text-[#006633]' : 'text-gray-700'} mb-2`}>
                    {comment.authorName}
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                </div>
                <p className="text-xs text-[#555555] mt-1 ml-2">Posted on {new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!submission) return <div className="flex items-center justify-center h-64 text-gray-500">Submission not found.</div>;

  return (
    <div className="relative">
      
      {/* Conditional Rendering: Deleted View vs Main Content */}
      {isDeleted ? (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center animate-in fade-in zoom-in-95 duration-300">
          <h1 className="merriweather text-2xl font-bold text-gray-800">Submission Deleted</h1>
          <p className="mt-2 text-gray-600">Submission ID {submission.id} has been permanently deleted.</p>
          <Link 
            to="/author/dashboard" 
            className="mt-6 inline-flex items-center text-sm py-2.5 px-5 rounded-lg bg-[#006633] text-white hover:bg-[#004D26] transition-colors shadow-sm hover:shadow"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="mb-10 lg:pt-8 animate-in fade-in duration-500">
            <Link to="/author/dashboard" className="text-[#006633] hover:underline mb-2 flex items-center text-sm font-medium">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to All Submissions
            </Link>
            <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1">
              Submission ID {submission.id}
            </h1>
            <p className="text-lg text-[#555555] lg:hidden">
              {submission.title}
            </p>
            <div className="mt-4">
              <span className={`px-3 py-1 inline-flex text-base leading-5 font-semibold rounded-full ${submission.status === 'Accepted' || submission.status === 'Published' ? 'bg-green-100 text-green-800' : submission.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {submission.status}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              
              {/* Submission Details Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h2 className="merriweather text-xl font-bold text-[#006633]">Submission Details</h2>
                  
                  {/* Action Buttons */}
                  {!isEditMode ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleEditClick}
                        className="text-sm py-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-1.5 transition-colors shadow-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-sm py-2 px-3 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center space-x-1.5 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleCancelEdit}
                        className="text-sm py-2 px-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors shadow-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveChanges}
                        className="text-sm py-2 px-3 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center space-x-1.5 transition-colors shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Editable Form Fields */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label htmlFor="submission-title" className="block text-sm font-semibold text-gray-700 mb-1">Title:</label>
                    {isEditMode ? (
                      <input 
                        type="text" 
                        id="submission-title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="input-style mt-1 text-base text-gray-800"
                      />
                    ) : (
                      <p className="mt-1 text-lg font-bold text-[#1f2937] leading-tight">{submission.title}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="submission-category" className="block text-sm font-semibold text-gray-700 mb-1">Category:</label>
                    {isEditMode ? (
                      <input 
                        type="text" 
                        id="submission-category"
                        value="Precision Farming"
                        onChange={handleInputChange}
                        className="input-style mt-1 text-sm text-gray-800"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{submission.category || 'Precision Farming'}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="submission-keywords" className="block text-sm font-semibold text-gray-700 mb-1">Keywords:</label>
                    {isEditMode ? (
                      <>
                        <input 
                          type="text" 
                          id="submission-keywords"
                          value={formData.keywords}
                          onChange={handleInputChange}
                          className="input-style mt-1 text-sm text-gray-800"
                        />
                        <p className="text-xs text-gray-500 mt-1">Comma-separated keywords.</p>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-gray-800">{submission.keywords}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="submission-abstract" className="block text-sm font-semibold text-gray-700 mb-1">Abstract:</label>
                    {isEditMode ? (
                      <textarea 
                        id="submission-abstract"
                        rows="6"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        className="input-style mt-1 text-sm leading-relaxed"
                      />
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{submission.abstract}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviewer Comments Section */}
              <section>
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                  <h2 className="merriweather text-2xl font-bold text-[#222222]">Reviewer Comments</h2>
                  <div className="flex items-center">
                    <label htmlFor="comment-filter" className="text-sm font-medium text-gray-700 mr-2">Show comments for:</label>
                    <select 
                      id="comment-filter"
                      className="text-sm py-1.5 px-3 rounded-md border border-gray-300 shadow-sm focus:border-[#006633] focus:ring-1 focus:ring-[#006633] outline-none bg-white"
                      value={commentFilter}
                      onChange={(e) => setCommentFilter(e.target.value)}
                    >
                      <option value="all">All Revisions</option>
                      {revisions.map(rev => (
                        <option key={`filter-${rev.id}`} value={rev.versionName}>{rev.versionName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  {renderComments()}
                </div>
              </section>
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-10 h-fit animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
              
              {/* Process Guide */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="merriweather text-xl font-bold text-[#222222] mb-6">Submission Process</h3>
                <div className="flex items-start justify-between space-x-1 relative">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center flex-1 z-10">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Send className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 mt-2 text-center">Submitted</span>
                  </div>
                  <div className="absolute top-5 left-[12.5%] right-[87.5%] w-[25%] h-0.5 bg-green-500 opacity-50 z-0"></div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center flex-1 z-10">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 mt-2 text-center">Under<br/>Review</span>
                  </div>
                  <div className="absolute top-5 left-[37.5%] right-[62.5%] w-[25%] h-0.5 bg-green-500 opacity-50 z-0"></div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center flex-1 z-10">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Edit className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 mt-2 text-center">Revision</span>
                  </div>
                  <div className="absolute top-5 left-[62.5%] right-[37.5%] w-[25%] h-0.5 bg-green-500 opacity-50 z-0"></div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col items-center flex-1 z-10">
                    <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-sm ${submission.status === 'Accepted' || submission.status === 'Published' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 mt-2 text-center">Accepted</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6 leading-relaxed">This guide shows the typical submission process. The steps this submission completed are marked in green.</p>
              </div>

              {/* Submission Log */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="merriweather text-xl font-bold text-[#222222] mb-6">Submission Log</h3>
                <div className="relative ml-2">
                  <style dangerouslySetInnerHTML={{__html: `
                    .timeline-line {
                      position: absolute;
                      left: 1rem;
                      top: 2rem;
                      bottom: 0;
                      width: 2px;
                      background-color: #e5e7eb;
                      transform: translateX(-50%);
                    }
                    .timeline-item:last-child .timeline-line { display: none; }
                  `}} />
                  {timeline.map((item, index) => {
                    const isAccepted = item.status === 'Accepted' || item.status === 'Published';
                    const isRevision = item.status.includes('Revision');
                    const Icon = isAccepted ? Check : (isRevision ? Edit : Clock);
                    const colorClass = isAccepted ? 'bg-green-500' : (isRevision ? 'bg-blue-500' : 'bg-yellow-500');
                    const textClass = isAccepted ? 'text-green-700' : (isRevision ? 'text-blue-700' : 'text-yellow-700');

                    return (
                      <div key={item.id} className="timeline-item relative pl-10 pb-6">
                        <div className="timeline-line"></div>
                        <div className={`timeline-icon absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center -ml-4 z-10 text-white shadow-sm ${colorClass}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className={`font-semibold ${textClass}`}>
                          {item.status}
                        </p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-400 mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* File History */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="merriweather text-xl font-bold text-[#222222] mb-4">File History</h3>
                <ul className="space-y-3">
                  {revisions.length === 0 && <p className="text-gray-500 italic">No files uploaded.</p>}
                  {revisions.map((rev, index) => (
                    <li key={rev.id} className={`${index > 0 ? 'pt-3 border-t border-gray-100 mt-3' : ''}`}>
                      <a href={rev.fileUrl || '#'} className={`flex items-center hover:underline ${index === 0 ? 'text-[#006633]' : 'text-gray-600 hover:text-gray-900'}`}>
                        <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{rev.fileName}</span>
                      </a>
                      <p className="text-xs text-gray-500 pl-7 mt-1">Uploaded: {new Date(rev.uploadedAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="merriweather text-xl font-bold text-gray-900">Delete Submission?</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Are you sure you want to delete submission <strong className="font-semibold text-gray-800">ID {submission.id}</strong>? 
                  This action is permanent and cannot be undone. All associated files and review history will be permanently removed.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-2 px-4 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="py-2 px-4 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Yes, Delete Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white transition-all duration-300 transform ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
        {toast.message}
      </div>

    </div>
  );
}

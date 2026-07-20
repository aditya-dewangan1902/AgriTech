import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Download,
  CheckCheck,
  Clock,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import api from '../../api';
import { DUMMY_SUBMISSIONS } from '../../dummyData';



export default function AdminSubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data State
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState('Major Revision');
  const [revisions, setRevisions] = useState([]);
  const [comments, setComments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  
  // Interaction State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [commentFilter, setCommentFilter] = useState('all');
  const [newCommentRevId, setNewCommentRevId] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [revisionToDelete, setRevisionToDelete] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await api.get(`/admin/submissions/${id}`);
        setSubmission(res.data);
        setCurrentStatus(res.data.status);
        setRevisions(res.data.revisions || []);
        setComments(res.data.comments || []);
        setTimeline(res.data.logs || []);
        if (res.data.revisions && res.data.revisions.length > 0) {
          setNewCommentRevId(res.data.revisions[0].versionName);
        }
      } catch (err) {
        const dummy = DUMMY_SUBMISSIONS.find(s => String(s.id) === String(id)) || DUMMY_SUBMISSIONS[0];
        if (dummy) {
          setSubmission(dummy);
          setCurrentStatus(dummy.status);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id]);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/submissions/${id}`, { status: currentStatus });
      setSubmission(prev => ({ ...prev, status: currentStatus }));
      
      // Add status change to timeline locally for UX
      const newTimelineItem = {
        id: Date.now(),
        status: currentStatus,
        description: '(Status updated by Admin)',
        date: new Date().toISOString().split('T')[0],
        type: 'pending',
        icon: currentStatus === 'Accepted' ? CheckCheck : (currentStatus.includes('Revision') ? Edit : Clock),
        colorClass: currentStatus === 'Accepted' ? 'bg-green-500 text-green-700' : (currentStatus.includes('Revision') ? 'bg-blue-500 text-blue-700' : 'bg-yellow-500 text-yellow-700')
      };
      setTimeline([newTimelineItem, ...timeline]);
      
      showToast(`Status updated to ${currentStatus} successfully!`);
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      // In a real app we'd save the full comment object, but our current API only takes a single string.
      // We will save it to state for visual parity.
      await api.put(`/admin/submissions/${id}`, { reviewerComments: newCommentText });
      
      const newComment = {
        id: Date.now(),
        revId: newCommentRevId,
        author: 'Admin (You)',
        role: 'admin',
        text: newCommentText,
        date: new Date().toISOString().split('T')[0],
        avatar: 'A'
      };

      setComments([newComment, ...comments]);
      setNewCommentText('');
      showToast('Comment posted successfully!');
    } catch (err) {
      showToast('Failed to post comment.', 'error');
    }
  };

  const confirmDeleteRevision = () => {
    if (revisionToDelete) {
      setRevisions(revisions.filter(r => r.id !== revisionToDelete.id));
      if (commentFilter === revisionToDelete.id) setCommentFilter('all');
      if (newCommentRevId === revisionToDelete.id) setNewCommentRevId(revisions[0]?.id || 'all');
      showToast(`Revision deleted.`);
    }
    setDeleteModalOpen(false);
    setRevisionToDelete(null);
  };

  const filteredComments = commentFilter === 'all' 
    ? comments 
    : comments.filter(c => c.revId === commentFilter);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!submission) return <div className="flex items-center justify-center h-64 text-gray-500">Submission not found.</div>;

  return (
    <div className="relative">
      
      {/* Toast Notification */}
      <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-lg shadow-xl text-white transition-all duration-300 transform ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
        {toast.message}
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all animate-in zoom-in-95 duration-200 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-[#DC2626]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Revision</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <strong className="text-gray-800">"{revisionToDelete?.name}"</strong>? 
              <br/>This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={confirmDeleteRevision}
                className="w-full justify-center rounded-lg bg-[#DC2626] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#991b1b] transition-colors order-1 sm:order-none"
              >
                Confirm Delete
              </button>
              <button 
                onClick={() => {
                  setDeleteModalOpen(false);
                  setRevisionToDelete(null);
                }}
                className="w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="mb-10 lg:pt-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <Link to="/admin/submissions" className="text-[#006633] hover:underline mb-2 flex items-center text-sm font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Submissions
          </Link>
          <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1">
            Submission Review (ID {submission.id})
          </h1>
          <p className="text-lg text-[#555555]">
            {submission.title}
          </p>
        </div>
        <a 
          href={submission.manuscriptFile || '#'}
          download
          className="bg-[#006633] text-white py-2.5 px-5 rounded-lg font-medium hover:bg-[#004D26] transition-colors flex items-center justify-center shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Download className="w-5 h-5 mr-2" /> Download Latest (Rev 1)
        </a>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Paper Metadata */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="merriweather text-xl font-bold text-[#006633] pb-2 border-b border-gray-100">Paper Information</h2>
            <p className="text-sm"><span className="font-semibold text-gray-700">Author:</span> {submission.author?.firstName} {submission.author?.lastName} ({submission.author?.affiliation || 'Unknown Affiliation'})</p>
            <p className="text-sm"><span className="font-semibold text-gray-700">Category:</span> Blockchain</p>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="font-semibold text-gray-700">Abstract:</span> {submission.abstract}</p>
          </div>

          {/* Status Update */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="merriweather text-xl font-bold text-[#DC2626] pb-2 border-b border-gray-100 mb-4">Update Submission Status</h2>
            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label htmlFor="status-select" className="block text-sm font-medium text-[#222222] mb-2">Select New Status</label>
                <select 
                  id="status-select" 
                  className="input-style"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Major Revision">Major Revision Required</option>
                  <option value="Minor Revision">Minor Revision Required</option>
                  <option value="Accepted">Accepted (Ready for Publication)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#DC2626] text-white py-3 rounded-lg font-semibold hover:bg-[#991b1b] transition-colors shadow-sm hover:shadow">
                Apply Status Change
              </button>
            </form>
          </div>

          {/* Publication Actions (Conditional) */}
          {currentStatus === 'Accepted' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="merriweather text-xl font-bold text-green-700 pb-2 border-b border-gray-100 mb-4">Publication Actions</h2>
              <p className="text-sm text-gray-600 mb-4">This paper is accepted and ready for publication.</p>
              <Link 
                to={`/admin/publication/${submission.id}`}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm hover:shadow flex items-center justify-center space-x-2"
              >
                <CheckCheck className="w-5 h-5" />
                <span>Proceed to Publish</span>
              </Link>
            </div>
          )}

          {/* Comments Section */}
          <section>
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
              <h2 className="merriweather text-2xl font-bold text-[#222222]">Reviewer/Editor Comments</h2>
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

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold mb-3 text-gray-800">Add New Comment:</h3>
              <form onSubmit={handlePostComment}>
                <textarea 
                  rows="4" 
                  className="input-style mb-4" 
                  placeholder="Enter feedback or status notes for the author here..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  required
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attach comment to:</label>
                    <select 
                      className="input-style text-sm py-2.5"
                      value={newCommentRevId}
                      onChange={(e) => setNewCommentRevId(e.target.value)}
                    >
                      {revisions.map(rev => (
                        <option key={`new-${rev.id}`} value={rev.versionName}>{rev.versionName}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="sm:self-end bg-[#006633] text-white py-2.5 px-5 rounded-lg font-medium hover:bg-[#004D26] transition-colors shadow-sm hover:shadow">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>

            <h3 className="text-lg font-semibold text-[#555555] mb-4">Comment History:</h3>
            <div className="space-y-6">
              {filteredComments.length === 0 ? (
                <p className="text-gray-500 italic">No comments found for this filter.</p>
              ) : (
                filteredComments.map(comment => {
                  const isAdmin = comment.role === 'admin';
                  return (
                    <div key={comment.id} className="flex items-start gap-3 w-full">
                      {/* Avatar Left */}
                      {!isAdmin && (
                        <div className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">
                          {comment.avatar}
                        </div>
                      )}
                      
                      {/* Bubble Container */}
                      <div className={`flex flex-col ${isAdmin ? 'items-end w-full' : 'items-start flex-grow'}`}>
                        <div className={`
                          p-4 text-sm w-full lg:max-w-[90%] shadow-sm
                          ${isAdmin 
                            ? 'bg-green-50 border border-green-100 rounded-2xl rounded-tr-sm' 
                            : 'bg-white border border-gray-200 rounded-2xl rounded-tl-sm'
                          }
                        `}>
                          <p className={`font-semibold mb-1 ${isAdmin ? 'text-[#006633]' : 'text-gray-800'}`}>
                            {comment.authorName}
                          </p>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                        </div>
                        <p className="text-xs text-[#555555] mt-1 px-1">Posted on {new Date(comment.createdAt).toLocaleDateString()}</p>
                      </div>

                      {/* Avatar Right */}
                      {isAdmin && (
                        <div className="bg-[#DC2626] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">
                          {comment.avatar}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="space-y-6 lg:sticky lg:top-10 h-fit">
          
          {/* Submission Log Timeline */}
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
                const Icon = isAccepted ? CheckCheck : (isRevision ? Edit : Clock);
                const colorClass = isAccepted ? 'bg-green-500' : (isRevision ? 'bg-blue-500' : 'bg-yellow-500');
                const textClass = isAccepted ? 'text-green-700' : (isRevision ? 'text-blue-700' : 'text-yellow-700');

                return (
                  <div key={item.id} className="timeline-item relative pl-10 pb-6">
                    <div className="timeline-line"></div>
                    <div className={`timeline-icon absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center -ml-4 z-10 text-white ${colorClass}`}>
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

          {/* Commenters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="merriweather text-xl font-bold text-[#222222] mb-3">Commenters</h3>
            <p className="text-sm text-gray-500 mb-4">Showing only reviewers who have posted comments.</p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium">Admin</span> 
                <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full">Editor</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0 last:pb-0">
                <span className="font-medium">Dr. C. Vance</span> 
                <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full">Reviewer 1</span>
              </li>
            </ul>
          </div>

          {/* Revision History */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="merriweather text-xl font-bold text-[#222222] mb-4">Revision History</h3>
            <ul className="space-y-3 text-sm">
              {revisions.length === 0 ? (
                <p className="text-gray-500 italic">No revisions found.</p>
              ) : (
                revisions.map((rev, index) => (
                  <li key={rev.id} className="flex justify-between items-center p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
                    <div>
                      <p className={`font-semibold ${index === 0 ? 'text-[#006633]' : 'text-gray-700'}`}>{rev.versionName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Uploaded: {new Date(rev.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <a href={submission.manuscriptFile || '#'} title="Download" className="p-1.5 rounded text-gray-500 hover:text-[#006633] hover:bg-green-50 transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                      <button 
                        title="Delete" 
                        onClick={() => {
                          setRevisionToDelete(rev);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded text-gray-400 hover:text-[#DC2626] hover:bg-red-50 transition-colors group-hover:text-[#DC2626]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FolderOpen, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api';
import { DUMMY_SUBMISSIONS } from '../../dummyData';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get('/admin/submissions');
        if (res.data && res.data.length > 0) {
          setSubmissions(res.data);
        } else {
          setSubmissions(DUMMY_SUBMISSIONS);
        }
      } catch (err) {
        console.error(err);
        setSubmissions(DUMMY_SUBMISSIONS);
      }
    };
    fetchSubmissions();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getCount = (statusType) => {
    if (statusType === 'all') return submissions.length;
    if (statusType === 'pending') return submissions.filter(s => s.status === 'Under Review').length;
    if (statusType === 'accepted') return submissions.filter(s => s.status === 'Accepted' || s.status === 'Published' || s.status === 'Major Revision' || s.status === 'Minor Revision').length;
    if (statusType === 'rejected') return submissions.filter(s => s.status === 'Rejected').length;
    return 0;
  };
  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1 break-words">Journal Management Dashboard</h1>
        <p className="text-lg text-[#555555] break-words">Overview of all submissions and publication queue.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/admin/submissions" className="block bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-400 hover:shadow-xl hover:bg-gray-50 transition-all duration-200">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#555555] uppercase">Total Submissions</p>
            <FolderOpen className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('all')}</p>
        </Link>
        <Link to="/admin/submissions?tab=pending" className="block bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl hover:bg-gray-50 transition-all duration-200">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#555555] uppercase">Pending Review</p>
            <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('pending')}</p>
        </Link>
        <Link to="/admin/submissions?tab=accepted" className="block bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl hover:bg-gray-50 transition-all duration-200">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#555555] uppercase">Accepted / Revision</p>
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('accepted')}</p>
        </Link>
        <Link to="/admin/submissions?tab=rejected" className="block bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl hover:bg-gray-50 transition-all duration-200">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-[#555555] uppercase">Rejected</p>
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('rejected')}</p>
        </Link>
      </div>

      <section>
        <h2 className="merriweather text-2xl font-bold text-[#222222] mb-6">All Active Submissions</h2>
        <div className="bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E5E5]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Paper Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider hidden sm:table-cell">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-[#444444]">
              {submissions.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{sub.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    <Link to={`/admin/submissions/${sub.id}`} className="hover:underline">{sub.title}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">{sub.author?.firstName} {sub.author?.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(sub.createdAt).toISOString().split('T')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sub.status)}`}>{sub.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {sub.status === 'Accepted' ? (
                      <Link to={`/admin/publication/${sub.id}`} className="text-primary hover:text-green-800 font-semibold">Publish</Link>
                    ) : (
                      <Link to={`/admin/submissions/${sub.id}`} className="text-red-600 hover:text-red-800 font-semibold">Review</Link>
                    )}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No submissions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

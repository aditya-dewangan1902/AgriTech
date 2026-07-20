import { Link } from 'react-router-dom';
import { FolderOpen, Clock, Edit, CheckCircle, Search, Plus, Layers, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../api';
import { DUMMY_SUBMISSIONS } from '../../dummyData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        const res = await api.get('/author/submissions');
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

  const filteredSubmissions = submissions.filter(sub => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending' && sub.status === 'Under Review') return true;
    if (activeTab === 'revision' && (sub.status === 'Major Revision' || sub.status === 'Minor Revision')) return true;
    if (activeTab === 'accepted' && (sub.status === 'Accepted' || sub.status === 'Published')) return true;
    if (activeTab === 'rejected' && sub.status === 'Rejected') return true;
    return false;
  });

  const getCount = (statusType) => {
    if (statusType === 'all') return submissions.length;
    if (statusType === 'pending') return submissions.filter(s => s.status === 'Under Review').length;
    if (statusType === 'revision') return submissions.filter(s => s.status === 'Major Revision' || s.status === 'Minor Revision').length;
    if (statusType === 'accepted') return submissions.filter(s => s.status === 'Accepted' || s.status === 'Published').length;
    if (statusType === 'rejected') return submissions.filter(s => s.status === 'Rejected').length;
    return 0;
  };

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1">Welcome, {user?.lastName ? `Dr. ${user.lastName}` : 'Author'}</h1>
        <p className="text-lg text-[#555555]">Track your active submissions and review history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#555555] uppercase mr-2">Total Submissions</p>
            <FolderOpen className="w-6 h-6 text-primary flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('all')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-600">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#555555] uppercase mr-2">Pending Review</p>
            <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('pending')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#555555] uppercase mr-2">Revisions Required</p>
            <Edit className="w-6 h-6 text-blue-600 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('revision')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-700">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#555555] uppercase mr-2">Accepted</p>
            <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0" />
          </div>
          <p className="merriweather text-4xl font-extrabold text-[#222222] mt-2">{getCount('accepted')}</p>
        </div>
      </div>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="merriweather text-2xl font-bold text-[#222222]">My Submissions</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative sm:w-72">
              <input type="text" placeholder="Search by title or ID..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 text-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <Link to="/author/new-submission" className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" /> New Submission
            </Link>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {[
              { id: 'all', label: `All (${getCount('all')})`, icon: Layers },
              { id: 'pending', label: `Pending (${getCount('pending')})`, icon: Clock },
              { id: 'revision', label: `Revision (${getCount('revision')})`, icon: Edit },
              { id: 'accepted', label: `Accepted (${getCount('accepted')})`, icon: CheckCircle },
              { id: 'rejected', label: `Rejected (${getCount('rejected')})`, icon: XCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm`}
              >
                <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E5E5]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider max-w-[150px] sm:max-w-xs">Paper Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider hidden sm:table-cell">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-[#444444]">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{sub.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-primary max-w-[150px] sm:max-w-xs break-words">
                      <Link to={`/author/submission/${sub.id}`} className="hover:underline">{sub.title}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">{new Date(sub.createdAt).toISOString().split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sub.status)}`}>{sub.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/author/submission/${sub.id}`} className="text-primary hover:underline">View Details</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No submissions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

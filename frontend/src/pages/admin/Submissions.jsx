import { useState, useEffect } from 'react';
import { Search, Filter, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { DUMMY_SUBMISSIONS } from '../../dummyData';

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredSubmissions = submissions.filter(sub => 
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.id.toString().includes(searchTerm)
  );

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1 flex items-center">
          <FolderOpen className="w-7 h-7 mr-3 text-primary" /> Submissions Directory
        </h1>
        <p className="text-lg text-[#555555]">View and filter all journal submissions.</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative sm:w-72">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search submissions..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 text-sm" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="bg-gray-100 text-gray-700 font-medium py-2.5 px-5 rounded-lg border hover:bg-gray-200 transition-colors flex items-center justify-center w-full sm:w-auto">
          <Filter className="w-5 h-5 mr-2" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-x-auto mt-6">
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
            {filteredSubmissions.map(sub => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{sub.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {sub.title}
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
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No submissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminSubmissions;

import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react';

const AdminUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/users');
  };

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <Link to="/admin/users" className="text-primary hover:underline mb-2 flex items-center text-sm">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to User Management
        </Link>
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1">
          {isEditMode ? 'Edit User Account' : 'Create User Account'}
        </h1>
        <p className="text-lg text-[#555555]">
          {isEditMode ? 'Update user details below.' : 'Add new user details below.'}
        </p>
      </header>

      <section className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-[#E5E5E5]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">First Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required defaultValue={isEditMode ? 'L.' : ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Last Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required defaultValue={isEditMode ? 'Rodriguez' : ''} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required defaultValue={isEditMode ? 'author123@agritech.com' : ''} />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#222222] mb-2">User Role</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required defaultValue={isEditMode ? 'author' : ''}>
              <option value="author">Author</option>
              <option value="peer-reviewer">Peer Reviewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Set Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">Password</label>
                <input type="password" placeholder={isEditMode ? "Leave blank to keep unchanged" : ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">Confirm Password</label>
                <input type="password" placeholder="" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
          </div>

          <div className="pt-4 border-t flex flex-wrap justify-between items-center gap-4">
            <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl flex items-center justify-center flex-grow sm:flex-grow-0">
              <PlusCircle className="w-5 h-5 mr-2" />
              <span>{isEditMode ? 'Save Changes' : 'Create Account'}</span>
            </button>

            {isEditMode && (
              <button type="button" className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center flex-grow sm:flex-grow-0">
                <Trash2 className="w-5 h-5 mr-2" /> Delete User
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminUserForm;

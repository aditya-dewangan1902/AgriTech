import { useState } from 'react';
import { UserCog, ShieldAlert, Edit3, Save } from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    institution: 'AgriTech Publishing',
    department: 'Editorial Team',
    email: 'admin@agritech.edu',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add logic to show success toast here if needed
  };

  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1 flex items-center">
          <UserCog className="w-7 h-7 mr-3 text-red-600" /> Admin Profile
        </h1>
        <p className="text-lg text-[#555555]">Manage your administrator account, information, and security settings.</p>
      </header>

      <form onSubmit={handleSave} className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-[#E5E5E5] space-y-8 divide-y divide-gray-200">
        
        <section className="pt-6 first:pt-0">
          <h2 className="merriweather text-2xl font-bold text-primary mb-4">1. Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">First Name</label>
              <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} value={profile.firstName} readOnly={!isEditing} onChange={e => setProfile({...profile, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Last Name</label>
              <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} value={profile.lastName} readOnly={!isEditing} onChange={e => setProfile({...profile, lastName: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="pt-6">
          <h2 className="merriweather text-2xl font-bold text-primary mb-4">2. Affiliation</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Institution / University</label>
              <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} value={profile.institution} readOnly={!isEditing} onChange={e => setProfile({...profile, institution: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Department (Optional)</label>
              <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} value={profile.department} readOnly={!isEditing} onChange={e => setProfile({...profile, department: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="pt-6">
          <h2 className="merriweather text-2xl font-bold text-primary mb-4">3. Account Security</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">Email Address</label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <input type="email" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} value={profile.email} readOnly={!isEditing} onChange={e => setProfile({...profile, email: e.target.value})} required />
                <div className="mt-2 sm:mt-0 flex-shrink-0 flex items-center gap-3">
                  <span className="flex items-center text-sm text-gray-500">
                    <ShieldAlert className="w-4 h-4 mr-1.5 text-red-600" /> Not Verified
                  </span>
                  <button type="button" className="text-sm font-medium text-primary hover:text-primary-dark">Verify Email</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">New Password</label>
                <input type="password" placeholder="Leave blank to keep current" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} readOnly={!isEditing} />
                {isEditing && <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">Confirm New Password</label>
                <input type="password" placeholder="Re-type new password" className={`w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'}`} readOnly={!isEditing} />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6">
          {!isEditing ? (
            <button type="button" onClick={() => setIsEditing(true)} className="w-full sm:w-auto bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl">
              <Edit3 className="w-5 h-5 mr-3" /> Edit Profile
            </button>
          ) : (
            <button type="submit" className="w-full sm:w-auto bg-primary text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center shadow-lg hover:shadow-xl">
              <Save className="w-5 h-5 mr-3" /> Save All Changes
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AdminProfile;

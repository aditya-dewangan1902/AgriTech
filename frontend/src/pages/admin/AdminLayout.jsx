import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, PencilRuler, Users, User, Home, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/publication', label: 'Publication Tools', icon: PencilRuler },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/profile', label: 'Admin Profile', icon: User },
  ];

  const getNavClass = (path) => {
    const base = 'flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 font-medium';
    const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
    if (isActive) {
      // Admin active: red background with red right-border accent (from admin_style.css)
      return `${base} bg-[#DC2626] text-white border-r-4 border-[#f87171] font-semibold`;
    }
    return `${base} text-gray-300 hover:bg-[#065f46] hover:text-white`;
  };

  return (
    <div className="flex overflow-x-hidden" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full bg-white z-30 lg:hidden flex justify-between items-center h-16 border-b border-[#E5E5E5] px-4">
        <Link to="/" className="flex items-center space-x-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary h-8 w-8">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V19C9 19.55 9.45 20 10 20H11V19.93ZM13 19.93V20H14C14.55 20 15 19.55 15 19V15L19.79 10.21C19.92 10.78 20 11.38 20 12C20 16.08 16.95 19.44 13 19.93ZM17.95 8.5L13 13.45V6C13 5.45 12.55 5 12 5S11 5.45 11 6V13.45L6.05 8.5C7.5 5.56 10.12 3.63 12 3.06C13.88 3.63 16.5 5.56 17.95 8.5Z" fill="currentColor" />
          </svg>
          <span className="merriweather text-xl font-bold text-gray-800">Admin Portal</span>
        </Link>
        <button onClick={toggleSidebar} className="p-2 text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar Navigation — full dark green bg, fixed, 256px wide */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ width: '256px', height: '100vh', backgroundColor: '#004D26', color: '#fff' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 pt-8 flex items-center space-x-2 pb-4 border-b border-green-700 mb-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8 flex-shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V19C9 19.55 9.45 20 10 20H11V19.93ZM13 19.93V20H14C14.55 20 15 19.55 15 19V15L19.79 10.21C19.92 10.78 20 11.38 20 12C20 16.08 16.95 19.44 13 19.93ZM17.95 8.5L13 13.45V6C13 5.45 12.55 5 12 5S11 5.45 11 6V13.45L6.05 8.5C7.5 5.56 10.12 3.63 12 3.06C13.88 3.63 16.5 5.56 17.95 8.5Z" fill="currentColor" />
          </svg>
          <h2 className="text-2xl font-bold merriweather text-white">Admin Portal</h2>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2 pt-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={closeSidebar} className={getNavClass(to)}>
              <Icon className="w-5 h-5 flex-shrink-0" /><span>{label}</span>
            </Link>
          ))}

          {/* Divider section */}
          <div className="pt-4 mt-4 border-t border-green-700 space-y-2">
            <Link to="/" onClick={closeSidebar} className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#065f46] hover:text-white transition-colors duration-200 font-medium">
              <Home className="w-5 h-5 flex-shrink-0" /><span>Back to Main Site</span>
            </Link>
            <Link to="/login" onClick={closeSidebar} className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#991b1b] hover:text-white transition-colors duration-200 font-medium">
              <LogOut className="w-5 h-5 flex-shrink-0" /><span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow min-h-screen pt-16 lg:pt-0" style={{ paddingLeft: '0', marginLeft: '256px' }}>
        {/* On mobile, no left margin */}
        <style>{`@media (max-width: 1023px) { main { margin-left: 0 !important; } }`}</style>
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden" onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default AdminLayout;

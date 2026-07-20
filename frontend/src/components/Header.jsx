import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkBaseClass = "px-4 py-2 rounded-lg font-medium transition-colors text-sm";
  const activeLinkClass = "text-primary bg-white";
  const inactiveLinkClass = "text-white hover:bg-white/10";

  return (
    <header className="header-sticky sticky top-0 left-0 w-full bg-primary-dark/95 backdrop-blur-md z-50 flex items-center shadow-lg border-b border-primary/20 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] flex justify-between items-center w-full h-16">
        <Link to="/" className="flex items-center space-x-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V19C9 19.55 9.45 20 10 20H11V19.93ZM13 19.93V20H14C14.55 20 15 19.55 15 19V15L19.79 10.21C19.92 10.78 20 11.38 20 12C20 16.08 16.95 19.44 13 19.93ZM17.95 8.5L13 13.45V6C13 5.45 12.55 5 12 5S11 5.45 11 6V13.45L6.05 8.5C7.5 5.56 10.12 3.63 12 3.06C13.88 3.63 16.5 5.56 17.95 8.5Z" fill="currentColor" />
          </svg>
          <span className="merriweather text-xl sm:text-2xl font-bold text-white">AgriTech</span>
        </Link>

        <nav className="hidden md:flex space-x-1 items-center">
          <Link to="/" className={`${linkBaseClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>Home</Link>
          <Link to="/papers" className={`${linkBaseClass} ${isActive('/papers') ? activeLinkClass : inactiveLinkClass}`}>Published Papers</Link>
          <Link to="/about" className={`${linkBaseClass} ${isActive('/about') ? activeLinkClass : inactiveLinkClass}`}>About</Link>
          <Link to="/contact" className={`${linkBaseClass} ${isActive('/contact') ? activeLinkClass : inactiveLinkClass}`}>Contact</Link>
          <Link to="/guidelines" className={`${linkBaseClass} ${isActive('/guidelines') ? activeLinkClass : inactiveLinkClass}`}>Submission Guidelines</Link>
          <Link to="/login" className="bg-white text-primary hover:bg-gray-100 px-5 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 text-sm ml-4 shadow-sm hover:shadow-md">Login</Link>
        </nav>

        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white/80 p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-700 p-2">
            <X className="w-8 h-8" />
          </button>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/') ? 'text-primary' : 'text-gray-700'}`}>Home</Link>
          <Link to="/papers" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/papers') ? 'text-primary' : 'text-gray-700'}`}>Published Papers</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}>About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/contact') ? 'text-primary' : 'text-gray-700'}`}>Contact</Link>
          <Link to="/guidelines" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/guidelines') ? 'text-primary' : 'text-gray-700'}`}>Submission Guidelines</Link>
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-semibold ${isActive('/login') ? 'text-primary' : 'text-gray-700'}`}>Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

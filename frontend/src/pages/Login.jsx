import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Shield } from 'lucide-react';
import api from '../api';

const Login = () => {
  const [activeTab, setActiveTab] = useState('author');
  const [email, setEmail] = useState('author123@agritech.com');
  const [password, setPassword] = useState('password123');
  const [adminId, setAdminId] = useState('admin123@agritech.com');
  const [adminPassword, setAdminPassword] = useState('password123');
  const navigate = useNavigate();

  const handleAuthorLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/author/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email: adminId, password: adminPassword });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        alert('Access denied. Admin only.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200">
          <div className="flex justify-center items-center mb-6">
            <LogIn className="w-8 h-8 text-primary mr-3" />
            <h1 className="merriweather text-3xl font-bold text-gray-800 text-center">Sign In</h1>
          </div>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
            <button 
              onClick={() => setActiveTab('author')} 
              className={`flex-1 py-2 font-medium text-sm transition-colors ${activeTab === 'author' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Author
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`flex-1 py-2 font-medium text-sm transition-colors ${activeTab === 'admin' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Admin
            </button>
          </div>

          {activeTab === 'author' ? (
            <form onSubmit={handleAuthorLogin} className="space-y-6">
              <h2 className="text-xl font-semibold text-center text-primary-dark merriweather">Author Portal</h2>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="w-5 h-5 text-gray-400" />
                  </span>
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-800">Password</label>
                  <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </span>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                  <span className="relative bg-white px-4 text-sm text-gray-500">Or continue with</span>
                </div>
                <button type="button" className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.108-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C39.712,35.619,44,29.38,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-3.5 px-7 rounded-lg shadow-lg hover:shadow-xl text-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-[1.02]">
                Login as Author
              </button>
              <p className="text-sm text-center text-gray-500">
                Need an account? <Link to="/register" className="font-medium text-primary hover:underline">Register here</Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <h2 className="text-xl font-semibold text-center text-primary-dark merriweather">Admin Portal</h2>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Admin ID or Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </span>
                  <input 
                    type="text" 
                    required 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    placeholder="admin@agritech.org or admin_user" 
                    value={adminId}
                    onChange={e => setAdminId(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-800">Password</label>
                  <Link to="/forgot-password?role=admin" className="text-sm font-medium text-primary hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </span>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    placeholder="••••••••" 
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3.5 px-7 rounded-lg shadow-lg hover:shadow-xl text-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-[1.02]">
                Login as Admin
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

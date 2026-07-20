import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import api from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await api.post('/auth/register', {
        firstName,
        lastName,
        affiliation,
        email,
        password,
        role: 'author'
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/author/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200">
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="merriweather text-3xl font-bold text-gray-800 mb-2">Create Author Account</h1>
            <p className="text-lg text-gray-500">Join AgriTech to submit and track your research.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Primary Affiliation / Institution</label>
              <input type="text" value={affiliation} onChange={e => setAffiliation(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="University of Agricultural Technology" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="jane.doe@university.edu" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Must be at least 8 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Re-type your password" />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-3 text-sm text-gray-500">
                <input type="checkbox" required className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary" />
                <span>I agree to the <a href="#" className="text-primary font-medium hover:underline">Terms of Service</a> and Privacy Policy.</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3.5 px-7 rounded-lg shadow-lg hover:shadow-xl text-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-[1.02]">
              Register Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-8">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign In Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

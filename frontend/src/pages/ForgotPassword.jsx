import { Link } from 'react-router-dom';
import { KeyRound, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200">
          <div className="flex justify-center items-center mb-6">
            <KeyRound className="w-8 h-8 text-primary mr-3" />
            <h1 className="merriweather text-3xl font-bold text-gray-800 text-center">Forgot Password</h1>
          </div>

          {!submitted ? (
            <>
              <p className="text-center text-gray-600 mb-6">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                  <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="you@example.com" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3.5 px-7 rounded-lg shadow-lg hover:shadow-xl text-lg font-semibold hover:bg-primary-dark transition-all duration-200 transform hover:scale-[1.02]">
                  Send Reset Link
                </button>
                <p className="text-sm text-center text-gray-600">
                  Remember your password? <Link to="/login" className="font-medium text-primary hover:underline">Sign In</Link>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center mt-6 p-4 bg-green-50 border border-green-300 rounded-lg">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-primary mb-1">Reset Link Sent!</p>
              <p className="text-sm text-gray-600">Please check your email inbox (and spam folder) for instructions on how to reset your password.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

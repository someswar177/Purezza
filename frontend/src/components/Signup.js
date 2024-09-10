import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8000';

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/signup`, { email, password, isAdmin });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Sign Up</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="form-checkbox text-blue-500"
          />
          <span className="ml-2 text-gray-800 text-lg font-medium">Register as Admin</span>
        </label>
        
        <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
        
      </form>
    </div>
  );
};

export default Signup;

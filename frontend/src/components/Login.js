import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, isAdmin);
      if (isAdmin) navigate('/admin'); 
      else navigate('/complaints'); 
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Login</h2>
        
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
        
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Login as:</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={!isAdmin}
                onChange={() => setIsAdmin(false)} 
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-800 text-lg font-medium">User</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={isAdmin}
                onChange={() => setIsAdmin(true)}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-800 text-lg font-medium">Admin</span>
            </label>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
        
        <p className="text-center text-gray-600 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline font-medium">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;

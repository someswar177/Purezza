import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
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
      await login(email, password);
      if (isAdmin) navigate('/admin'); 
      else navigate('/complaints'); 
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
      />
      
      <div className="mb-4">
        <label className="block mb-2 font-bold">Login as:</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="role"
              value="user"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)} 
              className="form-radio"
            />
            <span className="ml-2">User</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)}
              className="form-radio"
            />
            <span className="ml-2">Admin</span>
          </label>
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
      </p>
    </form>
  );
};

export default Login;

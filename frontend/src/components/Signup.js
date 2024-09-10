import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8000';

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/signup`, { email, password, isAdmin });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          className="form-checkbox"
        />
        <span className="ml-2">Register as Admin</span>
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;

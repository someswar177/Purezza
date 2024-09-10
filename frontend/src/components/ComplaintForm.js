import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


const ComplaintForm = () => {
  const [description, setDescription] = useState('');
  const apiUrl = 'http://localhost:8000';
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      await axios.post(
        `${apiUrl}/raisecomplaint`, 
        { description }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Complaint submitted');
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your issue"
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ComplaintForm;

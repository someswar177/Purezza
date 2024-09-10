import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const ComplaintForm = () => {
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState([]);
  const apiUrl = 'http://localhost:8000';
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const fetchComplaints = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/getUsercomplaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [apiUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/raisecomplaint`,
        { description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Complaint submitted');
      setDescription('');
      fetchComplaints();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-md font-medium text-gray-700 mb-2">
              Complaint Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Describe your issue"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mt-8 max-w-6xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Past Complaints</h2>
        <ul className="space-y-4">
          {complaints.map((complaint) => (
            <li key={complaint._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 text-lg"><strong>Complaint:</strong> {complaint.description}</p>
                <p className="text-gray-600 text-sm"><strong>Time:</strong> {formatDate(complaint.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintForm;

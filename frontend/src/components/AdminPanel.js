import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const apiUrl = 'http://localhost:8000';
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/getcomplaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();
  }, [token]);

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
    <div className="w-full p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Admin Panel</h2>
      <h3 className="text-xl font-semibold mb-6 text-gray-600 text-left">All Complaints</h3>
      <ul className="space-y-4">
        {complaints.map((complaint) => (
          <li key={complaint._id} className="p-4 border border-gray-200 rounded-lg">
            <p className="text-gray-900 text-lg font-medium mb-1 text-left">
            <strong>User:</strong> {complaint.user?.email || 'N/A'}
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <p className="text-gray-700 text-base mb-1 md:mb-0 text-left">
              <strong>Complaint:</strong> {complaint.description}
              </p>
              <p className="text-gray-500 text-sm text-right">
              <strong>Time:</strong> {formatDate(complaint.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

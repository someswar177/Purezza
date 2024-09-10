import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const apiUrl = 'http://localhost:8000';

  useEffect(() => {
    const fetchComplaints = async () => {
      const { data } = await axios.get(`${apiUrl}/getcomplaints`);
      setComplaints(data);
      console.log(data);
    };
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id} className="mb-4 p-4 bg-gray-100 rounded">
            {/* <p><strong>User:</strong>({complaint.user.email})</p> */}
            <p><strong>Complaint:</strong> {complaint.description}</p>
            <p><strong>Status:</strong> {complaint.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/FarmerDashboard.css';

const FarmerDashboard = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://52.66.183.128:5000/api/farmer/get');
      setFarmers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        await axios.delete(`http://52.66.183.128:5000/api/farmer/delete/${id}`);
        fetchFarmers();
      } catch (error) {
        console.error('Error deleting farmer:', error);
      }
    }
  };

  const handleUpdate = (id) => {
    alert(`Update feature for ID: ${id} coming soon...`);
  };

  return (
    <div className="farmer-dashboard">
      <h2 className="dashboard-title">Farmer Details</h2>

      {farmers.length === 0 ? (
        <p className="no-data">No farmers found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Middle Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Village</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Gov ID</th>
                <th>Gov ID 2</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td>{farmer.id}</td>
                  <td>{farmer.name || '-'}</td>
                  <td>{farmer.middleName || '-'}</td>
                  <td>{farmer.surname || '-'}</td>
                  <td>{farmer.age || '-'}</td>
                  <td>{farmer.village || '-'}</td>
                  <td>{farmer.contactNumber || '-'}</td>
                  <td>{farmer.email || '-'}</td>
                  <td>
                    {farmer.govId ? (
                      <a
                        href={`http://52.66.183.128:5000/uploads/${farmer.govId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://52.66.183.128:5000/uploads/${farmer.govId}`}
                          alt={`Gov ID of ${farmer.name}`}
                          className="preview-img"
                        />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    {farmer.govId2 ? (
                      <a
                        href={`http://52.66.183.128:5000/uploads/${farmer.govId2}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://52.66.183.128:5000/uploads/${farmer.govId2}`}
                          alt={`Gov ID 2 of ${farmer.name}`}
                          className="preview-img"
                        />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    {farmer.photo ? (
                      <a
                        href={`http://52.66.183.128:5000/uploads/${farmer.photo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://52.66.183.128:5000/uploads/${farmer.photo}`}
                          alt={`Photo of ${farmer.name}`}
                          className="preview-img"
                        />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleUpdate(farmer.id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(farmer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;

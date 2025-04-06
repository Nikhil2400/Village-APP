import React, { useState, useEffect } from 'react';
import { getAbout, addAbout, updateAbout, deleteAbout } from '../../services/aboutService';

const AdminAbout = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const response = await getAbout();
    setAbout(response.data.data);
  };

  const handleDelete = async (id) => {
    await deleteAbout(id);
    fetchAbout();
  };

  return (
    <div>
      <h2>Manage About</h2>
      {about.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminAbout;

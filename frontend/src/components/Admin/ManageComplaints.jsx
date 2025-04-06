import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/complaints');
      setComplaints(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      fetchComplaints();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>Manage Complaints</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Complaint</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.complaint}</TableCell>
              <TableCell>
                {c.file && <a href={`http://localhost:5000/uploads/${c.file}`} target="_blank" rel="noopener noreferrer">View File</a>}
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteComplaint(c.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ManageComplaints;

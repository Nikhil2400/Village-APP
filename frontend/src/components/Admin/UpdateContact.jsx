import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateContact = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://52.66.183.128:5000/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://52.66.183.128:5000/api/contact/add', contact);
      fetchContacts();
      setContact({ name: '', email: '', phone: '', address: '' });
      alert('Contact added successfully');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://52.66.183.128:5000/api/contact/delete/${id}`);
      fetchContacts();
      alert('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Address"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1976d2' }}>
              Add Contact
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* ✅ Display Contacts */}
      {contacts.map((item) => (
        <Paper key={item.id} elevation={6} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
          <Typography><strong>Name:</strong> {item.name}</Typography>
          <Typography><strong>Email:</strong> {item.email}</Typography>
          <Typography><strong>Phone:</strong> {item.phone}</Typography>
          <Typography><strong>Address:</strong> {item.address}</Typography>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={() => handleDelete(item.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      ))}
    </Container>
  );
};

export default UpdateContact;

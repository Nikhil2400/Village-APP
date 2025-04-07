import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import "../../styles/Message.css";

const BASE_URL = 'http://52.66.183.128:5000/api';

const Message = () => {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [message, setMessage] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);

  useEffect(() => {
    fetchNumbers();
    fetchSentMessages();
  }, []);

  // Fetch phone numbers from server
  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/phone/get-numbers`);
      setNumbers(response.data.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  // Fetch sent messages from server
  const fetchSentMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sent-message`);
      setSentMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching sent messages:', error);
    }
  };

  // Add new phone number
  const handleAddNumber = async () => {
    if (!newName || !newNumber) return alert('Please enter name and number');
    try {
      await axios.post(`${BASE_URL}/phone/add-number`, {
        name: newName,
        number: newNumber,
      });
      fetchNumbers();
      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.error('Error adding number:', error);
    }
  };

  // Delete phone number
  const handleDeleteNumber = async (id) => {
    if (!window.confirm('Delete this number?')) return;
    try {
      await axios.delete(`${BASE_URL}/phone/delete-number/${id}`);
      fetchNumbers();
    } catch (error) {
      console.error('Error deleting number:', error);
    }
  };

  // Toggle number selection
  const handleSelectNumber = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  // Select or deselect all numbers
  const handleSelectAll = () => {
    setSelectedNumbers(
      selectedNumbers.length === numbers.length
        ? []
        : numbers.map((n) => n.phone_number)
    );
  };

  // Send or update message
  const handleSendMessage = async () => {
    if (!message.trim()) return alert('Please enter a message.');
    if (selectedNumbers.length === 0) return alert('Select at least one number.');

    try {
      if (editMessageId) {
        await axios.put(`${BASE_URL}/phone/update-message/${editMessageId}`, {
          message,
          numbers: selectedNumbers,
        });
        alert('Message updated successfully.');
        setEditMessageId(null);
      } else {
        await axios.post(`${BASE_URL}/phone/send-message`, {
          numbers: selectedNumbers,
          message,
        });
        alert('Message sent successfully.');
      }
      setMessage('');
      setSelectedNumbers([]);
      fetchSentMessages();
    } catch (error) {
      console.error('Error sending/updating message:', error);
    }
  };

  // Populate message for editing
  const handleEditMessage = (msg) => {
    setEditMessageId(msg.id);
    setMessage(msg.message);
    setSelectedNumbers(JSON.parse(msg.numbers));
  };

  // Delete sent message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${BASE_URL}/phone/delete-message/${id}`);
      fetchSentMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>📤 Send Message</Typography>

      <TextField
        label="Enter message"
        fullWidth
        multiline
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {/* Add New Number Section */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <TextField
          label="Phone Number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddNumber}>Add</Button>
      </div>

      {/* Phone Number Table */}
      <Typography variant="h6">📞 Phone Numbers</Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedNumbers.length === numbers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numbers.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedNumbers.includes(row.phone_number)}
                    onChange={() => handleSelectNumber(row.phone_number)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteNumber(row.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Send/Update Button */}
      <Button
        variant="contained"
        color={editMessageId ? 'secondary' : 'primary'}
        onClick={handleSendMessage}
        sx={{ marginBottom: 4 }}
      >
        {editMessageId ? 'Update Message' : 'Send Message'}
      </Button>

      {/* Sent Messages Table */}
      <Typography variant="h6" gutterBottom>📨 Sent Messages</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sentMessages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.message}</TableCell>
                <TableCell>{JSON.parse(msg.numbers).join(', ')}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditMessage(msg)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteMessage(msg.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Message;

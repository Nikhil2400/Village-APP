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

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/phone/get-numbers');
      setNumbers(response.data.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const fetchSentMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/phone/messages');
      setSentMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleAddNumber = async () => {
    if (!newName || !newNumber) {
      alert('Please enter name and number');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/phone/add-number', {
        name: newName,
        number: newNumber,
      });
      fetchNumbers();
      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.error('Add number error:', error);
    }
  };

  const handleDeleteNumber = async (id) => {
    if (!window.confirm('Delete this number?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/phone/delete-number/${id}`);
      fetchNumbers();
    } catch (error) {
      console.error('Error deleting number:', error);
    }
  };

  const handleSelectNumber = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  const handleSelectAll = () => {
    setSelectedNumbers(
      selectedNumbers.length === numbers.length
        ? []
        : numbers.map((n) => n.phone_number)
    );
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert('Enter a message.');
      return;
    }
    if (selectedNumbers.length === 0) {
      alert('Select at least one number.');
      return;
    }
    try {
      if (editMessageId) {
        await axios.put(`http://localhost:5000/api/phone/update-message/${editMessageId}`, {
          message,
          numbers: selectedNumbers,
        });
        alert('Message updated.');
        setEditMessageId(null);
      } else {
        await axios.post('http://localhost:5000/api/phone/send-message', {
          numbers: selectedNumbers,
          message,
        });
        alert('Message sent!');
      }
      setMessage('');
      setSelectedNumbers([]);
      fetchSentMessages();
    } catch (error) {
      console.error('Send/update error:', error);
    }
  };

  const handleEditMessage = (msg) => {
    setEditMessageId(msg.id);
    setMessage(msg.message);
    setSelectedNumbers(JSON.parse(msg.numbers));
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/phone/delete-message/${id}`);
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

      {/* ✅ Phone Number List with Delete */}
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

      <Button
        variant="contained"
        color={editMessageId ? 'secondary' : 'primary'}
        onClick={handleSendMessage}
        sx={{ marginBottom: 4 }}
      >
        {editMessageId ? 'Update Message' : 'Send Message'}
      </Button>

      {/* ✅ Sent Messages Table with Edit/Delete */}
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

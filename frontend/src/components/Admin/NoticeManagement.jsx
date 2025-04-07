import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { Delete, Edit, AttachFile } from '@mui/icons-material';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://52.66.183.128:5000/api/notice/get-notices');
      setNotices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching notices:', error.message);
    }
  };

  // ✅ Handle Form Submit (Add/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (file) formData.append('file', file);

      if (editId) {
        await axios.put(`http://52.66.183.128:5000/api/notice/update-notice/${editId}`, formData);
      } else {
        await axios.post('http://52.66.183.128:5000/api/notice/add-notice', formData);
      }

      fetchNotices(); // ✅ Refresh notices immediately
      clearForm(); // ✅ Clear form after submit
    } catch (error) {
      console.error('Error adding/updating notice:', error.message);
    }
  };

  // ✅ Delete Notice
  const deleteNotice = async (id) => {
    try {
      await axios.delete(`http://52.66.183.128:5000/api/notice/delete-notice/${id}`);
      fetchNotices(); // ✅ Refresh notices immediately
    } catch (error) {
      console.error('Error deleting notice:', error.message);
    }
  };

  // ✅ Load Notice for Editing
  const editNotice = (notice) => {
    setEditId(notice.id);
    setTitle(notice.title);
    setDescription(notice.description);
  };

  // ✅ Clear Form Fields
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditId(null);
  };

  return (
    <Box
      sx={{
        padding: '30px',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1e88e5',
            marginBottom: '20px',
          }}
        >
          📢 Manage Notices
        </Typography>

        {/* ✅ Notice Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ marginBottom: '20px' }}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1e88e5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1565c0',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1e88e5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1565c0',
                  },
                },
              }}
            />
            {/* ✅ File Upload */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="file-upload">
                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  startIcon={<AttachFile />}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
                  {file ? file.name : 'Upload File'}
                </Button>
              </label>
            </Stack>
            {/* ✅ Buttons */}
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                {editId ? 'Update Notice' : 'Add Notice'}
              </Button>
              {editId && (
                <Button variant="outlined" color="secondary" onClick={clearForm}>
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </form>

        {/* ✅ Notices List */}
        <List>
          {notices.map((notice) => (
            <Paper
              key={notice.id}
              elevation={4}
              sx={{
                padding: '20px',
                marginBottom: '12px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => editNotice(notice)}
                      sx={{
                        color: '#1e88e5',
                        '&:hover': {
                          color: '#1565c0',
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteNotice(notice.id)}
                      sx={{
                        color: '#e53935',
                        '&:hover': {
                          color: '#c62828',
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
                      {notice.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography>{notice.description}</Typography>
                      {notice.file_url && (
                        <Typography
                          component="a"
                          href={`http://localhost:5000${notice.file_url}`}
                          target="_blank"
                          sx={{
                            color: '#ff9800',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          View Document
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NoticeManagement;

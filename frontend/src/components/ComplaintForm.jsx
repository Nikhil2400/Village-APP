import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, Fade } from '@mui/material';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', complaint: '', file: null });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('phone', formData.phone);
    form.append('complaint', formData.complaint);
    if (formData.file) form.append('file', formData.file);

    try {
      const res = await axios.post('http://52.66.183.128:5000/api/complaints/add', form);
      alert(res.data.message);
      setFormData({ name: '', phone: '', complaint: '', file: null });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('त्रुटी:', error);
      alert('तक्रार सबमिट करण्यात अपयश आले');
    }
  };

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: '#f4f6f8',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.02)' }
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ color: '#000', fontWeight: 'bold', mb: 2 }}
          >
            तक्रार नोंदवा
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '& .MuiTextField-root': {
                backgroundColor: '#ffffff',
                borderRadius: '4px',
              },
            }}
          >
            <TextField 
              name="name" 
              label="नाव" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              name="phone" 
              label="फोन नंबर" 
              type="tel"
              value={formData.phone} 
              onChange={handleChange} 
              required 
              fullWidth 
            />
            <TextField 
              name="complaint" 
              label="तक्रार" 
              value={formData.complaint} 
              onChange={handleChange} 
              multiline 
              rows={4} 
              required 
              fullWidth 
            />
            <input 
              type="file" 
              name="file" 
              onChange={handleChange} 
              style={{ marginBottom: '10px' }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                fontWeight: 'bold',
                padding: '10px'
              }}
            >
              सबमिट करा
            </Button>
          </Box>
          {submitted && (
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ color: '#4caf50', mt: 2 }}
            >
              तुमची तक्रार यशस्वीरित्या सबमिट झाली!
            </Typography>
          )}
        </Paper>
      </Container>
    </Fade>
  );
};

export default ComplaintForm;

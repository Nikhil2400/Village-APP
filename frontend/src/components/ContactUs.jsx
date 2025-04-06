import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper, Button, Grid } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import axios from 'axios';

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contact')
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error('Error fetching contact data:', error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#000' }}>
        Contact Us
      </Typography>

      <Grid container spacing={5}>
        {contacts.map((contact) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={contacts.length > 2 ? 4 : 6} // 2 per row if ≤ 2 contacts, 3 per row if more
            key={contact.id}
          >
            <Paper
              elevation={5}
              sx={{
                p: 3,
                borderRadius: 8,
                backgroundColor: '#f4f6f8',
                color: '#333',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Typography variant="body1"><strong>Name:</strong> {contact.name}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {contact.address}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {contact.phone}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {contact.email}</Typography>

              <Box mt={5} display="flex" gap={3}>
                <Button
                  variant="contained"
                  startIcon={<Phone />}
                  sx={{
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#388e3c' }
                  }}
                  onClick={() => window.location.href = `tel:${contact.phone}`}
                >
                  Call Now
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Email />}
                  sx={{
                    backgroundColor: '#ff9800',
                    '&:hover': { backgroundColor: '#f57c00' }
                  }}
                  onClick={() => window.location.href = `mailto:${contact.email}`}
                >
                  Send Email
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContactUs;

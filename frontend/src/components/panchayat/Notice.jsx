import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Stack, IconButton, CircularProgress, Container } from '@mui/material';
import { EventNote, Description, CalendarToday } from '@mui/icons-material';
import "../../styles/Notice.css";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notice/get-notices');
      setNotices(response.data.data || []);
    } catch (error) {
      console.error('सूचना मिळवताना त्रुटी:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px', paddingBottom: '30px' }}>
      {/* ✅ सूचना शीर्षक */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#1565c0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px',
        }}
      >
        📢 नवीन सूचना
      </Typography>

      {/* ✅ लोडिंग इंडिकेटर */}
      {loading ? (
        <Stack alignItems="center" sx={{ marginTop: '20px' }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={3} alignItems="center">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Paper
                key={notice.id}
                elevation={4}
                sx={{
                  width: '100%',
                  maxWidth: '900px',
                  padding: '20px',
                  borderRadius: '22px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                  borderLeft: '6px solid #1565c0',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack spacing={1}>
                    {/* ✅ सूचना शीर्षक */}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                      {notice.title}
                    </Typography>
                    {/* ✅ सूचना वर्णन */}
                    <Typography variant="body1" sx={{ color: '#424242', lineHeight: 1.6 }}>
                      {notice.description}
                    </Typography>
                    {/* ✅ सूचना दिनांक */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarToday fontSize="small" sx={{ color: '#757575' }} />
                      <Typography variant="caption" sx={{ color: '#757575' }}>
                        {new Date(notice.created_at).toLocaleDateString('mr-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </Typography>
                    </Stack>
                    {/* ✅ संलग्न फाईल (असल्यास) */}
                    {notice.file_url && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Description fontSize="small" sx={{ color: '#ff9800' }} />
                        <Typography
                          variant="caption"
                          component="a"
                          href={`http://localhost:5000${notice.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: '#ff9800',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          संलग्न दस्तऐवज पहा
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', fontSize: '18px' }}>
              🚫 कोणतीही सूचना उपलब्ध नाहीत
            </Typography>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Notice;

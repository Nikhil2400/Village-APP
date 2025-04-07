import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, TextField, Button, Typography, List, ListItem,
  ListItemText, IconButton, Divider, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch Announcements
  useEffect(() => {
    axios.get("http://52.66.183.128:5000/api/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("❌ Fetch Error:", err.response?.data || err.message));
  }, []);

  // Add or Update Announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      if (editId) {
        await axios.put(`http://52.66.183.128:5000/api/announcements/${editId}`, { message });
        setAnnouncements(
          announcements.map((a) => a.id === editId ? { id: editId, message } : a)
        );
        setEditId(null);
      } else {
        const res = await axios.post("http://52.66.183.128:5000/api/announcements", { message });
        setAnnouncements([...announcements, { id: res.data.insertId, message }]);
      }
      setMessage("");
    } catch (err) {
      console.error("❌ Submit Error:", err.response?.data || err.message);
    }
  };

  // Delete Announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://52.66.183.128:5000/api/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (err) {
      console.error("❌ Delete Error:", err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>📢 Manage Announcements</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Announcement Message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color={editId ? "warning" : "primary"}
            sx={{ mt: 2 }}
            fullWidth
          >
            {editId ? "Update" : "Add"} Announcement
          </Button>
        </form>
      </Paper>

      <List>
        {announcements.map((a) => (
          <Paper key={a.id} sx={{ mb: 1 }}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => {
                    setEditId(a.id);
                    setMessage(a.message);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleDelete(a.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={a.message} />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default AdminAnnouncements;

// src/components/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Menu, MenuItem,
  Box, useTheme, useMediaQuery, Stack
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation } from 'react-router-dom'; // ✅ imported
import '../../styles/AdminNavbar.css';

const AdminNavbar = ({ setActiveSection }) => {
  const [dashboardAnchor, setDashboardAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation(); // ✅ added

  const handleMenuOpen = (event) => setDashboardAnchor(event.currentTarget);
  const handleMenuClose = () => setDashboardAnchor(null);

  const handleSelect = (section) => {
    setActiveSection(section);
    handleMenuClose();
  };

  const dashboardItems = [
    { name: 'Dashboard', key: 'dashboard' },
    { name: 'Announcements', key: 'admin-announcements' },
    { name: 'Update GramSabha', key: 'update-gramsabha' },
    { name: 'Manage Member', key: 'manage-member' },
    { name: 'Farmer Dashboard', key: 'farmer-dashboard' },
    { name: 'Health', key: 'health' },
    { name: 'Manage Calendar', key: 'calender' },
    { name: 'Live Stream', key: 'admin-streaming' },
    { name: 'Manage Amount', key: 'admin-panel' },
    { name: 'Education Details', key: 'education-details' },
  ];

  const settingsButtons = [
    { name: 'Contact Us', key: 'update-contact' },
    { name: 'User Management', key: 'user-management' },
    { name: 'SMS Message', key: 'message' },
    { name: 'Complaints', key: 'manage-complaints' },
    { name: 'Notice', key: 'notice-management' },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Dashboard Dropdown */}
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              endIcon={<ArrowDropDownIcon />}
            >
              Dashboard
            </Button>
            <Menu
              anchorEl={dashboardAnchor}
              open={Boolean(dashboardAnchor)}
              onClose={handleMenuClose}
            >
              {dashboardItems.map((item) => (
                <MenuItem key={item.key} onClick={() => handleSelect(item.key)}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>

            {/* Settings Buttons */}
            {settingsButtons.map((item) => (
              <Button
                key={item.key}
                color="inherit"
                onClick={() => handleSelect(item.key)}
              >
                {item.name}
              </Button>
            ))}

            {/* Logout Link styled as button */}
            <Link
              to="/logout"
              className={location.pathname === "/logout" ? "active" : ""}
              style={{
                color: 'white',
                textDecoration: 'none',
                border: '1px solid white',
                borderRadius: '5px',
                padding: '6px 12px',
              }}
            >
              Logout
            </Link>
          </Box>
        ) : (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Stack spacing={1} alignItems="center">
              {/* Mobile Dashboard Dropdown */}
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                endIcon={<ArrowDropDownIcon />}
                sx={{ width: '90%' }}
              >
                Dashboard
              </Button>
              <Menu
                anchorEl={dashboardAnchor}
                open={Boolean(dashboardAnchor)}
                onClose={handleMenuClose}
              >
                {dashboardItems.map((item) => (
                  <MenuItem key={item.key} onClick={() => handleSelect(item.key)}>
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>

              {/* Settings as Buttons */}
              {settingsButtons.map((item) => (
                <Button
                  key={item.key}
                  variant="text"
                  color="inherit"
                  onClick={() => handleSelect(item.key)}
                  sx={{ width: '90%' }}
                >
                  {item.name}
                </Button>
              ))}

              {/* Mobile Logout Link */}
              <Link
                to="/logout"
                className={location.pathname === "/logout" ? "active" : ""}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  border: '1px solid white',
                  borderRadius: '5px',
                  padding: '6px 16px',
                  marginTop: '8px',
                }}
              >
                Logout
              </Link>
            </Stack>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;

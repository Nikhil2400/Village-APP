import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, ListItemIcon, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import TourIcon from '@mui/icons-material/Tour';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsIcon from '@mui/icons-material/Collections'; 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AnnouncementIcon from '@mui/icons-material/Announcement'; // ✅ Notice Icon
// import '../../styles/Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  const [openPanchayat, setOpenPanchayat] = useState(false);

  const handlePanchayatToggle = () => {
    setOpenPanchayat(!openPanchayat);
  };

  return (
    <div className="sidebar">
      <List>
        {/* ✅ Dashboard */}
        <ListItem button onClick={() => setActiveSection('dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />

        {/* ✅ Panchayat Dropdown */}
        <ListItem button onClick={handlePanchayatToggle}>
          <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
          <ListItemText primary="Panchayat" />
          {openPanchayat ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPanchayat} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
           
            
            <ListItem button onClick={() => setActiveSection('manage-doc')} sx={{ pl: 4 }}>
              <ListItemText primary="Update Documents" />
            </ListItem>
            <ListItem button onClick={() => setActiveSection('admin-announcements')}>
          <ListItemIcon><AgricultureIcon /></ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('update-gramsabha')}>
          <ListItemIcon><AgricultureIcon /></ListItemIcon>
          <ListItemText primary="Update GramSabha" />
        </ListItem>
           
            <ListItem button onClick={() => setActiveSection('manage-member')} sx={{ pl: 4 }}>
            <ListItemIcon><AgricultureIcon /></ListItemIcon>
              <ListItemText primary="Manage Member" />
            </ListItem>
           {/* ✅ Farmer Info */}
        <ListItem button onClick={() => setActiveSection('farmer-dashboard')}>
          <ListItemIcon><AgricultureIcon /></ListItemIcon>
          <ListItemText primary="Farmer Dashboard" />
        </ListItem>

           
          </List>
        </Collapse>
 


        {/* ✅ Health */}
        <ListItem button onClick={() => setActiveSection('health')}>
          <ListItemIcon><HealthAndSafetyIcon /></ListItemIcon>
          <ListItemText primary="Health" />
        </ListItem>

        {/* ✅ Tourism */}
        <ListItem button onClick={() => setActiveSection('admin-tourism')}>
          <ListItemIcon><TourIcon /></ListItemIcon>
          <ListItemText primary="Tourism" />
        </ListItem>

       
        <ListItem button onClick={() => setActiveSection('calender')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary=" Manage Calender" />
        </ListItem>
        <ListItem button onClick={() => setActiveSection('admin-streaming')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Live Strem" />
        </ListItem>
        

        <ListItem button onClick={() => setActiveSection('admin-panel')}>
          <ListItemIcon><AgricultureIcon /></ListItemIcon>
          <ListItemText primary="Manage Amount" />
        </ListItem>
        
        <Divider />

      </List>
    </div>
  );
};

export default Sidebar;   
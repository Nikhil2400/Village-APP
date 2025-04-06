import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
// import Panchayat from '../components/Admin/Panchayat';
import Health from '../components/Admin/Health';

import Schemes from '../components/Admin/Schemes';
import Message from '../components/Admin/Message'; // ✅ Import Message
import UserManagement from '../components/Admin/UserManagement'; // ✅ Import User Management
import ManageMember from "../components/Admin/ManageMember";

import NoticeManagement from '../components/Admin/NoticeManagement';
import UpdateContact from '../components/Admin/UpdateContact';
import ManageComplaints from '../components/Admin/ManageComplaints';
import FarmerDashboard from '../components/Admin/FarmerDashboard.jsx';
import AdminNavbar from '../components/UI/AdminNavbar.jsx';
import Header from '../components/UI/Header.jsx';
import AdminAnnouncements from '../components/Admin/AdminAnnouncements.jsx';
import UpdateGramSabha from '../components/Admin/UpdateGramSabha.jsx';
import AdminStreaming from '../components/Admin/AdminStreaming.jsx';
import Calendar from '../components/Admin/Calender.jsx';
import EducationDetails from '../components/Admin/EducationDetails.jsx';


const AdminRoutes = () => {
  return (
   
    <Routes>
      
      {/* ✅ Existing Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* <Route path="/admin/panchayat" element={<Panchayat />} /> */}
      <Route path="/admin/health" element={<Health />} />
      <Route path="/admin/farmer-dashboard" element={<FarmerDashboard />} />
      <Route path="/admin/schemes" element={<Schemes />} />
      <Route path="/admin/message" element={<Message />} />
      <Route path="/admin/user-management" element={<UserManagement />} />
      <Route path="/admin/notice-management" element={<NoticeManagement />} />
      {/* ✅ New Route for PanchayatAbout */}
      <Route path="/admin/admin-nevbar" element={<AdminNavbar />} />
      <Route path="/admin/contact" element={<UpdateContact />} />
     <Route path="/admin/complaints" element={<ManageComplaints />} />
     <Route path="/UI/header" element={<Header />} />
     <Route path="/admin/announcements" element={<AdminAnnouncements/>} />
     <Route path="/admin/update-gram-sabha" element={<UpdateGramSabha/>} />
     <Route path="/admin/manage-members" element={<ManageMember />} />
     <Route path="/admin/admin-streaming" element={<AdminStreaming/>} />
     <Route path="/admin/calender" element={<Calendar/>} />
     <Route path="admin/education-details" element={<EducationDetails />} />

    </Routes>
  );
};

export default AdminRoutes;

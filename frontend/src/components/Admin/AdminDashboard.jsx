import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import AdminNavbar from "../UI/AdminNavbar";
import Header from "../UI/Header";

import Health from "./Health";
import Schemes from "./Schemes";
import UserManagement from "./UserManagement";
import Message from "./Message";
import NoticeManagement from "./NoticeManagement";
import UpdateContact from "./UpdateContact";
import ManageComplaints from "./ManageComplaints";
import FarmerDashboard from "./FarmerDashboard";
import UpdateGramSabha from "./UpdateGramSabha";
import AdminPanel from "./AdminPanel";
import AdminAnnouncements from "./AdminAnnouncements";
import ManageMember from "./ManageMember";
import AdminStreaming from "./AdminStreaming";
import Calender from "./Calender";
import EducationDetails from "./EducationDetails";

import "../../styles/AdminDashboard.css";

Chart.register(...registerables);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    totalComplaints: 0,
    totalNotices: 0,
    recentActivities: [],
  });

  // Redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin"); // redirect if token not found
    }
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin"); // redirect to login after logout
  };

  const fetchDashboardData = async () => {
    try {
      const [
        usersRes,
        farmersRes,
        complaintsRes,
        noticesRes,
        activityRes,
      ] = await Promise.all([
        fetch("http://localhost:5000/api/users/count"),
        fetch("http://localhost:5000/api/farmers/count"),
        fetch("http://localhost:5000/api/complaints/count"),
        fetch("http://localhost:5000/api/notices/count"),
        fetch("http://localhost:5000/api/recent-activities"),
      ]);

      const [users, farmers, complaints, notices, activities] = await Promise.all([
        usersRes.json(),
        farmersRes.json(),
        complaintsRes.json(),
        noticesRes.json(),
        activityRes.json(),
      ]);

      setDashboardData({
        totalUsers: users.count,
        totalFarmers: farmers.count,
        totalComplaints: complaints.count,
        totalNotices: notices.count,
        recentActivities: activities,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ["Users", "Farmers", "Complaints", "Notices"],
    datasets: [
      {
        label: "Dashboard Statistics",
        data: [
          dashboardData.totalUsers,
          dashboardData.totalFarmers,
          dashboardData.totalComplaints,
          dashboardData.totalNotices,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
        borderWidth: 1,
      },
    ],
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="dashboard-section">
            <h2 className="dashboard-heading">Admin Dashboard</h2>
            <div className="dashboard-stats colorful-stats">
              <div className="stat-box blue" onClick={() => setActiveSection("user-management")}>
                <h3>Users</h3>
                <p>{dashboardData.totalUsers}</p>
              </div>
              <div className="stat-box green" onClick={() => setActiveSection("farmer-dashboard")}>
                <h3>Farmers</h3>
                <p>{dashboardData.totalFarmers}</p>
              </div>
              <div className="stat-box red" onClick={() => setActiveSection("manage-complaints")}>
                <h3>Complaints</h3>
                <p>{dashboardData.totalComplaints}</p>
              </div>
              <div className="stat-box yellow" onClick={() => setActiveSection("notice-management")}>
                <h3>Notices</h3>
                <p>{dashboardData.totalNotices}</p>
              </div>
            </div>

            <Bar data={chartData} />

            <div className="recent-activities colorful-bg">
              <h3 className="section-title">Recent Activities</h3>
              {dashboardData.recentActivities.length > 0 ? (
                <ul className="activity-list">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <li key={index} className="activity-item">{activity}</li>
                  ))}
                </ul>
              ) : (
                <p>No recent activities found.</p>
              )}
            </div>
          </div>
        );
      case "update-contact":
        return <UpdateContact />;
      case "manage-complaints":
        return <ManageComplaints />;
      case "health":
        return <Health />;
      case "schemes":
        return <Schemes />;
      case "farmer-dashboard":
        return <FarmerDashboard />;
      case "user-management":
        return <UserManagement />;
      case "message":
        return <Message />;
      case "notice-management":
        return <NoticeManagement />;
      case "admin-panel":
        return <AdminPanel />;
      case "admin-announcements":
        return <AdminAnnouncements />;
      case "update-gramsabha":
        return <UpdateGramSabha />;
      case "manage-member":
        return <ManageMember />;
     
      
      case "admin-streaming":
        return <AdminStreaming />;
      case "calender":
        return <Calender />;
      case "education-details":
        return <EducationDetails />;
      default:
        return (
          <div className="dashboard-section">
            <h2>Section Not Found</h2>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar setActiveSection={setActiveSection} handleLogout={handleLogout} />
      <div className="dashboard-content">
        <Header setActiveSection={setActiveSection} />
        <div className="dashboard-content-wrapper colorful-content">
          {loading ? <p>Loading dashboard...</p> : renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

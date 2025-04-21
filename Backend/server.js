const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload"); // Added for file uploads
const path = require("path");
const db = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const phoneRoutes = require("./routes/phoneRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const farmersRoutes = require("./routes/farmerRoutes");
const donationRoutes = require("./routes/donationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const gramSabhaRoutes = require("./routes/gramSabhaRoutes");
const membersRoutes = require("./routes/membersRoutes");
const streamingRoutes = require("./routes/streamingRoutes");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'https://nikhil2400.github.io',
  credentials: true
}));

app.use(express.json()); // ✅ Recommended: Use express.json() instead of bodyParser.json()
// app.use(bodyParser.urlencoded({ extended: true })); // ✅ Ensures form-data support
// app.use(fileUpload()); // ✅ Middleware for handling file uploads
app.use(express.urlencoded({ extended: true })); // ✅ Parses form data
// ✅ Static Folder for PDFs
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use("/tourist", express.static("tourist"));

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/phone", phoneRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/farmer", farmersRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api", paymentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/gram-sabha", gramSabhaRoutes);
app.use("/api/members", membersRoutes);
app.use("/api", streamingRoutes);


const resetPasswordRoutes = require('./routes/resetPasswordRoutes');
app.use('/api', resetPasswordRoutes);

const eventRoutes = require('./routes/events'); 
const adminCalendarRoutes = require('./routes/adminCalendarRoutes');
app.use('/api', eventRoutes);
app.use('/api', adminCalendarRoutes);


const userProfileRoutes = require("./routes/userProfileRoutes");
app.use("/", userProfileRoutes); // ✅ Use the route

const educationRoutes = require('./routes/educationRoutes');
app.use('/api/education', educationRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Village App Backend is Running ✅");
  });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://65.2.37.249:${PORT}`);
});

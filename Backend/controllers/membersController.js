const db = require("../config/db");
const PDFDocument = require("pdfkit");
const multer = require("multer");
const path = require("path");

// Multer Storage for File Uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Add a New Member
const addMember = (req, res) => {
  const { fullName, fatherHusbandName, gender, dob, age, caste, religion, mobile, whatsapp, email, aadhar, village, ward, houseNumber, pinCode } = req.body;
  const photo = req.files?.photo ? req.files.photo[0].filename : null;
  const govId = req.files?.govId ? req.files.govId[0].filename : null;

  const sql = `INSERT INTO members (fullName, fatherHusbandName, gender, dob, age, caste, religion, mobile, whatsapp, email, aadhar, village, ward, houseNumber, pinCode, photo, govId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(sql, [fullName, fatherHusbandName, gender, dob, age, caste, religion, mobile, whatsapp, email, aadhar, village, ward, houseNumber, pinCode, photo, govId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Member added successfully!" });
  });
};

// Fetch All Members
const getAllMembers = (req, res) => {
  db.query("SELECT * FROM members", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// Delete Member
const deleteMember = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM members WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Member deleted successfully!" });
  });
};

// Generate and Download PDF
const downloadMembersPDF = (req, res) => {
  db.query("SELECT * FROM members", (err, members) => {
    if (err) return res.status(500).json({ error: err.message });

    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="members.pdf"');
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);
    doc.fontSize(14).text("📋 गाँव के सभी सदस्य", { align: "center" });
    doc.moveDown();

    members.forEach((member, index) => {
      doc.text(`${index + 1}. नाम: ${member.fullName}, गाँव: ${member.village}, मोबाइल: ${member.mobile}`);
      doc.moveDown();
    });

    doc.end();
  });
};

module.exports = { addMember, getAllMembers, deleteMember, downloadMembersPDF, upload };

const express = require("express");
const { addMember, getAllMembers, deleteMember, downloadMembersPDF, upload } = require("../controllers/membersController");

const router = express.Router();

// Route to add a new member (with file upload)
router.post("/", upload.fields([{ name: "photo", maxCount: 1 }, { name: "govId", maxCount: 1 }]), addMember);

// Route to fetch all members
router.get("/", getAllMembers);

// Route to delete a member by ID
router.delete("/:id", deleteMember);

// Route to download members list as PDF
router.get("/download", downloadMembersPDF);

module.exports = router;

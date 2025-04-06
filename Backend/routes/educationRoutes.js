const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ========================= ADMIN ROUTES ============================= //

// ADD new education entry (with photos/videos)
router.post("/admin/add", upload.fields([{ name: "photos" }, { name: "videos" }]), (req, res) => {
  const { schools, colleges, teachers, students, achievements, schemes, infrastructure, contact } = req.body;

  const images = req.files?.photos?.map(file => file.filename) || [];
  const videos = req.files?.videos?.map(file => file.filename) || [];

  const gallery = JSON.stringify({ images, videos });

  const sql = "INSERT INTO education (schools, colleges, teachers, students, achievements, schemes, infrastructure, contact, gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [schools, colleges, teachers, students, achievements, schemes, infrastructure, contact, gallery], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, id: result.insertId });
  });
});

// GET all education entries
router.get("/admin/list", (req, res) => {
  db.query("SELECT * FROM education", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// UPDATE education entry (with photos/videos)
router.post("/admin/update/:id", upload.fields([{ name: "photos" }, { name: "videos" }]), (req, res) => {
  const { id } = req.params;
  const { schools, colleges, teachers, students, achievements, schemes, infrastructure, contact } = req.body;

  const newImages = req.files?.photos?.map(file => file.filename) || [];
  const newVideos = req.files?.videos?.map(file => file.filename) || [];

  db.query("SELECT gallery FROM education WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    let gallery = result[0]?.gallery ? JSON.parse(result[0].gallery) : { images: [], videos: [] };
    gallery.images.push(...newImages);
    gallery.videos.push(...newVideos);

    const sql = "UPDATE education SET schools=?, colleges=?, teachers=?, students=?, achievements=?, schemes=?, infrastructure=?, contact=?, gallery=? WHERE id=?";
    db.query(sql, [schools, colleges, teachers, students, achievements, schemes, infrastructure, contact, JSON.stringify(gallery), id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ success: true });
    });
  });
});

// DELETE media from gallery
router.post("/delete", (req, res) => {
  const { id, type, filename } = req.body;

  db.query("SELECT gallery FROM education WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    let gallery = JSON.parse(result[0].gallery);
    gallery[type === "photo" ? "images" : "videos"] = gallery[type === "photo" ? "images" : "videos"].filter((f) => f !== filename);

    db.query("UPDATE education SET gallery = ? WHERE id = ?", [JSON.stringify(gallery), id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ success: true });
    });
  });
});

// ====================== GET EDUCATION BY ID ========================= //

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM education WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Education data not found" });
    }

    const education = rows[0];
    education.gallery = education.gallery ? JSON.parse(education.gallery) : { images: [], videos: [] };
    res.json(education);
  } catch (error) {
    console.error("Error fetching education by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE education entry
router.delete("/admin/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM education WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete education entry" });
  }
});


module.exports = router;

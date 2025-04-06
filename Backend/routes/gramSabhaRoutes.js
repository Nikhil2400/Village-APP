const express = require("express");
const router = express.Router();
const gramSabhaController = require("../controllers/gramSabhaController");

router.get("/", gramSabhaController.getAllGramSabha);
router.post("/add", gramSabhaController.addGramSabha);
router.put("/update/:id", gramSabhaController.updateGramSabha);
router.delete("/delete/:id", gramSabhaController.deleteGramSabha);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const farmerController = require('../controllers/farmerController');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  '/add',
  upload.fields([{ name: 'govId' }, { name: 'govId2' }, { name: 'photo' }]),
  farmerController.addFarmer
);

router.get('/get', farmerController.getFarmers);
router.put(
  '/update/:id',
  upload.fields([{ name: 'govId' }, { name: 'govId2' }, { name: 'photo' }]),
  farmerController.updateFarmer
);
router.delete('/delete/:id', farmerController.deleteFarmer);

module.exports = router;

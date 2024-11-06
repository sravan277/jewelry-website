const express = require('express');
const router = express.Router();
const uploader = require('../middleware/uploder');
const { cloudinaryController } = require('../controller/cloudinary.controller');
const multer = require('multer');

const upload = multer();

// Get all images
router.get('/get-all-img', cloudinaryController.getAllImages);

// Add image
router.post('/add-img', upload.single('image'), cloudinaryController.saveImageCloudinary);

// Add multiple images
router.post('/add-multiple-img', upload.array('images', 5), cloudinaryController.addMultipleImageCloudinary);

// Delete image
router.delete('/img-delete', cloudinaryController.cloudinaryDeleteController);

// Get image by ID from Cloudinary
router.get('/get-img/:id', cloudinaryController.getImage);

module.exports = router;


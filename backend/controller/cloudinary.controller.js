const express = require('express');
const router = express.Router();
const { cloudinaryServices } = require("../services/cloudinary.service");
const Image = require('../models/Image');

// Save image to Cloudinary and MongoDB
router.post('/save-image', async (req, res, next) => {
  try {
    const result = await cloudinaryServices.cloudinaryImageUpload(req.file.buffer);
    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
    });
    await newImage.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: { url: result.secure_url, id: result.public_id },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Add multiple images to Cloudinary and save to MongoDB
router.post('/add-multiple-images', async (req, res) => {
  try {
    const files = req.files;
    const uploadResults = [];

    for (const file of files) {
      const result = await cloudinaryServices.cloudinaryImageUpload(file.buffer);
      const newImage = new Image({
        url: result.secure_url,
        public_id: result.public_id,
      });
      await newImage.save();
      uploadResults.push({ url: result.secure_url, id: result.public_id });
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to upload images" });
  }
});

// Delete image
router.delete('/delete', async (req, res) => {
  try {
    const { folder_name, id } = req.query;
    const public_id = `${folder_name}/${id}`;
    const result = await cloudinaryServices.cloudinaryImageDelete(public_id);

    res.status(200).json({
      success: true,
      message: "Deleted image successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete image" });
  }
});

// Get image by public_id
router.get('/get-image/:id', async (req, res) => {
  try {
    const publicId = req.params.id;
    const image = await Image.findOne({ public_id: publicId });

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`;

    res.status(200).json({ success: true, url: cloudinaryUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving image" });
  }
});

// Get all images
router.get('/get-all-img', async (req, res) => {
  try {
    const images = await Image.find();

    if (!images || images.length === 0) {
      return res.status(404).json({ success: false, message: "No images found" });
    }

    const imageUrls = images.map(image => ({
      public_id: image.public_id,
      url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`
    }));

    res.status(200).json({ success: true, images: imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving images" });
  }
});

module.exports = router;

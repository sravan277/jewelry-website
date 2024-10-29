const fs = require("fs");
const { cloudinaryServices } = require("../services/cloudinary.service");
const Image = require('../model/Image'); // Adjust the path as necessary
const { log } = require("console");

// Save image to Cloudinary and MongoDB
const saveImageCloudinary = async (req, res, next) => {
  console.log('Uploaded file:', req.file);
  try {
    const result = await cloudinaryServices.cloudinaryImageUpload(req.file.buffer);

    // Save image info to MongoDB
    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      // Add other fields as necessary
    });

    await newImage.save(); // Save to MongoDB

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: { url: result.secure_url, id: result.public_id },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Add multiple images to Cloudinary and save to MongoDB
const addMultipleImageCloudinary = async (req, res) => {
  try {
    const files = req.files;

    // Array to store Cloudinary image upload responses and MongoDB save results
    const uploadResults = [];

    for (const file of files) {
      // Upload image to Cloudinary
      const result = await cloudinaryServices.cloudinaryImageUpload(file.buffer); // Use file.buffer instead of file.path

      // Save image info to MongoDB
      const newImage = new Image({
        url: result.secure_url,
        public_id: result.public_id,
        // Add other fields as necessary
      });

      await newImage.save(); // Save to MongoDB

      // Store the Cloudinary response in the array
      uploadResults.push(result);
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults.map((res) => ({
        url: res.secure_url,
        id: res.public_id,
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to upload images",
    });
  }
};

// Cloudinary Image Delete
const cloudinaryDeleteController = async (req, res) => {
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
    res.status(500).send({
      success: false,
      message: "Failed to delete image",
    });
  }
};

// Get image from MongoDB
// Get image from Cloudinary using public_id stored in MongoDB
// Get image from Cloudinary using public_id stored in MongoDB
const getImage = async (req, res) => {
  try {
    const publicId = req.params.id; // Assuming you're passing the public_id as a parameter
    const image = await Image.findOne({ public_id: publicId }); // Find the image by public_id

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Construct the URL for the original image from Cloudinary
    const cloudinaryUrl = `https://res.cloudinary.com/dsjeue5xx/image/upload/${image.public_id}`; // Replace with your Cloud Name

    res.status(200).json({ success: true, url: cloudinaryUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving image" });
  }
};

const getAllImages = async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Image.find(); // Ensure this matches your MongoDB model

    if (!images || images.length === 0) {
      return res.status(404).json({ success: false, message: "No images found" });
    }

    // Construct URLs for each image
    const imageUrls = images.map(image => ({
      public_id: image.public_id,
      url: `https://res.cloudinary.com/dsjeue5xx/image/upload/${image.public_id}` // Replace with your Cloud Name
    }));

    res.status(200).json({ success: true, images: imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving images" });
  }
};



exports.cloudinaryController = {
  cloudinaryDeleteController,
  saveImageCloudinary,
  addMultipleImageCloudinary,
  getImage,
  getAllImages  // Exporting getImage function
};

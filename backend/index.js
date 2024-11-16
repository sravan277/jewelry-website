require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require('morgan');
const multer = require('multer'); // Required for handling file uploads
const Image = require('./model/Image'); // Assuming an Image model is defined for MongoDB
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Configure multer for image uploads
const upload = multer();

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File upload failed");
    }
    const img = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    const newImage = new Image({ images: [img] });
    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error("Error in /upload route:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


// Root route
app.get("/", (req, res) => res.send("App is running successfully"));

// Global error handler for not-found routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

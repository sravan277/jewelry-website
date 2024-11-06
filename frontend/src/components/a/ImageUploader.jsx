// /components/ImageUploadPage/ImageUploader.jsx
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import styles from "./ImageUploadStyles";

const ImageUploader = ({ loadImages }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        await axios.post("http://localhost:5000/api/cloudinary/add-img", formData);
        setUploadMessage("Image uploaded successfully!");
        setSelectedFile(null);
        setPreview("");
        loadImages(); // Refresh gallery on successful upload
      } catch (error) {
        setUploadMessage("Upload failed: " + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div>
      <div
        style={styles.dropZone}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
          }
        }}
      >
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept="image/*"
        />
        <FaCloudUploadAlt style={styles.icon} />
        <p>Drag & Drop Image Here or Click to Select</p>
      </div>
      {preview && <img src={preview} alt="Preview" style={styles.previewImage} />}
      {uploadMessage && <p>{uploadMessage}</p>}
      <button style={styles.uploadButton} onClick={handleUpload}>
        <FaCloudUploadAlt style={styles.buttonIcon} /> Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;

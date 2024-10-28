import React, { useState } from "react";
import { FaCloudUploadAlt, FaImages } from "react-icons/fa"; // Importing icons
import axios from "axios"; // Ensure you have axios installed

const ImageUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post("/imgup", formData); // Adjust the URL according to your server setup
        setUploadMessage(response.data.message);
      } catch (error) {
        setUploadMessage("Upload failed: " + error.response.data.message);
      }
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Your Image</h2>
      <div
        style={styles.dropZone}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          setSelectedFile(file);
          setPreview(URL.createObjectURL(file));
        }}
      >
        <input
          id="fileInput"
          type="file"
          style={styles.fileInput}
          onChange={handleFileSelect}
          accept="image/*"
        />
        <FaCloudUploadAlt style={styles.icon} />
        <p style={styles.dropZoneText}>Drag & Drop Image Here or Click to Select</p>
      </div>
      {preview && (
        <div style={styles.previewContainer}>
          <img src={preview} alt="Preview" style={styles.previewImage} />
        </div>
      )}
      {uploadMessage && <p>{uploadMessage}</p>}
      <div style={styles.buttonContainer}>
        <button style={styles.uploadButton} onClick={handleUpload}>
          <FaCloudUploadAlt style={styles.buttonIcon} /> Upload Image
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    color: "#333",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.5",
    marginBottom: "20px",
    textAlign: "center",
  },
  dropZone: {
    border: "2px dashed #4A90E2",
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    color: "#333",
    marginBottom: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  dropZoneText: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#666",
  },
  icon: {
    fontSize: "40px",
    color: "#4A90E2",
  },
  fileInput: {
    display: "none",
  },
  previewContainer: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "200px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  uploadButton: {
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
    width: "100%",
    maxWidth: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  buttonIcon: {
    fontSize: "18px",
  },
};

// Hover effects
styles.uploadButton[':hover'] = { backgroundColor: "#357ABD" };

export default ImageUploadPage;
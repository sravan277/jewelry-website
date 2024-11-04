import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const CloudinaryImageManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [images, setImages] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreview(null);
      alert("No file selected. Please choose an image file.");
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Match the field name on the server

      try {
        const response = await axios.post("http://localhost:5000/api/cloudinary/save-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUploadedUrl(response.data.data.url);
        setUploadMessage("Image uploaded successfully!");
        setSelectedFile(null);
        setPreview(null);
        fetchImages(); // Refresh gallery on successful upload
      } catch (error) {
        setUploadMessage("Upload failed: " + (error.response?.data?.message || error.message));
      }
    } else {
      alert("Please select a file first.");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cloudinary/get-all-img");
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images", error);
      alert("Error fetching images: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (publicId) => {
    try {
      await axios.delete("http://localhost:5000/api/cloudinary/delete", {
        params: { public_id: publicId },
      });
      setImages(images.filter((image) => image.public_id !== publicId));
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image", error);
      alert("Failed to delete image");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Generate Images</h2>
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
        <button style={styles.fetchButton} onClick={fetchImages}>
          Fetch All Generated Images
        </button>
      </div>
      <div style={styles.galleryContainer}>
        {images.map((image) => (
          <div key={image.public_id} style={styles.imageCard}>
            <img src={image.url} alt="Cloudinary" style={styles.galleryImage} />
            <button onClick={() => handleDelete(image.public_id)} style={styles.deleteButton}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
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
  fetchButton: {
    backgroundColor: "#28A745",
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
  galleryContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "20px",
    justifyContent: "center",
  },
  imageCard: {
    position: "relative",
    width: "150px",
    height: "150px",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },
  deleteButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "rgba(255, 0, 0, 1)",
    color: "#000",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
};

export default CloudinaryImageManager;

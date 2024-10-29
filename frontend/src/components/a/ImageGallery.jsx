// /components/ImageUploadPage/ImageGallery.jsx
import React from "react";
import styles from "./ImageUploadStyles";

const ImageGallery = ({ images, loadImages }) => {
  const handleDelete = async (publicId) => {
    try {
      await axios.delete("http://localhost:5000/api/cloudinary/img-delete", {
        data: { public_id: publicId },
      });
      loadImages(); // Refresh the gallery after deletion
    } catch (error) {
      console.error("Error deleting image", error);
      alert("Failed to delete image");
    }
  };

  return (
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
  );
};

export default ImageGallery;

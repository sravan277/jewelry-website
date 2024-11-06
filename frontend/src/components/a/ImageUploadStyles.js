// /components/ImageUploadPage/ImageUploadStyles.js
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
    icon: {
      fontSize: "40px",
      color: "#4A90E2",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "200px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
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
      background: "rgba(255, 0, 0, 1)", // Fully red background
      color: "#000", // Black color for the 'x'
      border: "none",
      borderRadius: "50%",
      width: "20px", // Adjusted width for smaller size
      height: "20px", // Adjusted height for smaller size
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px", // Adjusted font size to fit better
    },
  };
  
  export default styles;
  
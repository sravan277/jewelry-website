// /components/ImageUploadPage/ImageUploadPage.jsx
import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import styles from "./ImageUploadStyles";

const ImageUploadPage = () => {
  const [images, setImages] = useState([]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Convert your dreams into Reality</h2>
      <ImageUploader />
    </div>
  );
};

export default ImageUploadPage;

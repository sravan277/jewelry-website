import React, { useState } from 'react';

const ImageColorizer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handles image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setErrorMessage('');
      setProcessedImageUrl(null); // Reset the processed image URL on new selection
    }
  };

  // Uploads the selected image to the Flask API for processing
  const handleProcess = async () => {
    if (!selectedImage) {
      setErrorMessage('Please select an image file.');
      return;
    }

    // const formData = new FormData();
    // formData.append('file', selectedImage);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      const response = await fetch('http://127.0.0.1:4000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image processing failed. Please try again.');
      }

      // Get the processed image from the response as a blob
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(imageUrl);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
<div className="container mt-5">
      <h1 className="text-center mb-4">Image Colorizer</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <input 
            type="file" 
            accept="image/*" 
            className="form-control mb-3" 
            onChange={handleImageChange} 
          />
          <button 
            className="btn btn-primary btn-block mb-3" 
            onClick={handleProcess} 
            disabled={!selectedImage}
          >
            Upload & Process
          </button>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          {selectedImage && processedImageUrl && (
            <div className="row">
              <div className="col-md-6 text-center">
                <h5>Selected Image:</h5>
                <img 
                  src={URL.createObjectURL(selectedImage)} 
                  alt="Selected" 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px' }} 
                />
              </div>
              <div className="col-md-6 text-center">
                <h5>Processed Image:</h5>
                <img 
                  src={processedImageUrl} 
                  alt="Processed" 
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px' }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageColorizer;

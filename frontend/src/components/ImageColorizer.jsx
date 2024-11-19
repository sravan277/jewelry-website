import React, { useState } from 'react';

const ImageColorizer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [allImages, setAllImages] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setErrorMessage('');
      setProcessedImageUrl(null); // Reset processed image URL on new selection
    }
  };

  const handleProcess = async () => {
    if (!selectedImage) {
      setErrorMessage('Please select an image file.');
      return;
    }

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

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(imageUrl);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchAllImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/get_images');
      if (!response.ok) {
        throw new Error('Failed to fetch images.');
      }
      const data = await response.json();
      setAllImages(data);
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
          <button
            className="btn btn-secondary btn-block mb-3"
            onClick={fetchAllImages}
          >
            Fetch All Images
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
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              </div>
              <div className="col-md-6 text-center">
                <h5>Processed Image:</h5>
                <img
                  src={processedImageUrl}
                  alt="Processed"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              </div>
            </div>
          )}

          {allImages.length > 0 && (
            <div className="mt-4">
              <h5>All Stored Images:</h5>
              {allImages.map((img, idx) => (
                <div key={idx} className="mb-3">
                  <p>Sketch:</p>
                  <img src={`data:image/png;base64,${img.sketch_image}`} alt="Sketch" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                  <p>Generated:</p>
                  <img src={`data:image/png;base64,${img.generated_image}`} alt="Generated" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageColorizer;

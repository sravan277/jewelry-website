import React from 'react';

function ImageDisplay({ selectedImage, generatedImage }) {
    return (
        <div className="images-container">
            <div>
                <h3>Uploaded Image</h3>
                {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div>
            <div>
                <h3>Generated Image</h3>
                {generatedImage && <img src={generatedImage} alt="Generated" />}
            </div>
        </div>
    );
}

export default ImageDisplay;

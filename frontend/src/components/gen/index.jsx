import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setUploadedImage(URL.createObjectURL(file)); // Display the uploaded image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setMessage("Uploading and generating...");
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                // Assuming the result has a URL or base64 string for the output image
                setGeneratedImage(`http://127.0.0.1:5000/outputs/${result.output_image.temp_id}`); // Update based on API response
                setMessage("Image generated successfully!");
            } else {
                setMessage(result.error);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div id="container">
            <h1>Generate Image</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput">Select Image:</label>
                <input 
                    type="file" 
                    id="fileInput" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required 
                />
                <button type="submit">Upload and Generate Image</button>
            </form>
            <div id="message">{message}</div>
            <div className="images-container">
                <div>
                    <h3>Uploaded Image</h3>
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
                </div>
                <div>
                    <h3>Generated Image</h3>
                    {generatedImage && <img src={generatedImage} alt="Generated" />}
                </div>
            </div>
        </div>
    );
}

export default App;

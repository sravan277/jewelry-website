import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import ImageDisplay from './ImageDisplay';

function FileUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setMessage("Please select an image file.");
            return;
        }

        setLoading(true);
        setMessage("Uploading and generating...");

        const formData = new FormData();
        formData.append("file", e.target.fileInput.files[0]);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                const { temp_id } = response.data.output_image;
                setGeneratedImage(`http://127.0.0.1:5000/outputs/${temp_id}`);
                setMessage("Image generated successfully!");
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <h1>Generate Image</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput">Select Image:</label>
                <input
                    type="file"
                    id="fileInput"
                    name="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload and Generate Image'}
                </button>
            </form>

            <Message message={message} />
            <ImageDisplay selectedImage={selectedImage} generatedImage={generatedImage} />
        </div>
    );
}

export default FileUpload;

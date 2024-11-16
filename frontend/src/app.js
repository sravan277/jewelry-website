import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/generate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Convert hex string back to base64
            const imageHex = response.data.image;
            const byteCharacters = new Uint8Array(
                imageHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
            );
            const blob = new Blob([byteCharacters], { type: 'image/png' });
            const url = URL.createObjectURL(blob);

            setGeneratedImage(url);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <div>
            <h1>Image Generator</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Generate Image</button>
            </form>
            {generatedImage && (
                <div>
                    <h2>Generated Image:</h2>
                    <img src={generatedImage} alt="Generated" />
                </div>
            )}
        </div>
    );
}

export default App;

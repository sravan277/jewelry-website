import React, { useState, useEffect } from 'react';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [images, setImages] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const username = localStorage.getItem('username');

    // useEffect(() => {
    //     if (!username) {
    //         alert('User not logged in');
    //         window.location.href = '/login';
    //     }
    // }, [username]);

    const handleFile = (file) => {
        const objectURL = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreviewURL(objectURL);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('username', username);
        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.text();
            alert(data);

            // Reset preview
            setSelectedFile(null);
            setPreviewURL('');
        } catch (error) {
            alert('Error uploading image');
        }
    };

    const retrieveImages = async () => {
        try {
            const response = await fetch(`http://localhost:3001/images/${username}`);
            const images = await response.json();
            setImages(images);
        } catch (error) {
            alert('Error retrieving images');
        }
    };

    return (
        <div className="image-upload-container" style={containerStyle}>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                {/* Conditionally render drag-drop area or preview */}
                {!previewURL ? (
                    <div
                        className={`drag-drop-area ${isDragOver ? 'dragover' : ''}`}
                        style={dragDropAreaStyle}
                        onClick={() => document.getElementById('fileInput').click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        Drag & Drop an image here or click to select
                    </div>
                ) : (
                    <div className="preview-container" style={previewContainerStyle}>
                        <img src={previewURL} alt="Image Preview" style={previewImageStyle} />
                    </div>
                )}
                
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <button type="submit" className="upload-button" style={uploadButtonStyle}>
                    Upload Image
                </button>
            </form>
            <button onClick={retrieveImages} style={retrieveButtonStyle}>Retrieve Images</button>
            <div className="image-list" style={imageListStyle}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={`data:${img.contentType};base64,${img.data}`}
                        alt="Uploaded"
                        style={uploadedImageStyle}
                    />
                ))}
            </div>
        </div>
    );
};

// Inline styles
const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
};

const dragDropAreaStyle = {
    border: '2px dashed #bbb',
    borderRadius: '5px',
    padding: '40px',
    textAlign: 'center',
    color: '#bbb',
    fontSize: '16px',
    cursor: 'pointer',
};

const previewContainerStyle = {
    width: '100%',
    height: '400px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
};

const previewImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const uploadButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '20px',
    cursor: 'pointer',
    marginTop: '20px',
    textAlign: 'center',
};

const retrieveButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    textAlign: 'center',
};

const imageListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
};

const uploadedImageStyle = {
    maxWidth: '200px',
    margin: '10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
};

export default ImageUpload;

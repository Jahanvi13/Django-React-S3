import React, { useState } from 'react';
import './FileUpload.css';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8000/api/upload/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // Redirect or show success message as needed
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('Error uploading file');
        }
    };

    return (
        <div className="upload-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h2>Upload File</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <label>
                        Choose File:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadFile;

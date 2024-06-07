import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const UploadFile = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Files</h2>
            <form onSubmit={handleUploadFile}>
                <input type="file" onChange={handleFileChange} />
                
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadFile;

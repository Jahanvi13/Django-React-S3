import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileList.css';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/files/');
                setFiles(response.data.files);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                setError('Error fetching files');
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="file-list-container">
            <h2>Uploaded Files</h2>
            {error && <p className="error">{error}</p>}
            <ul className="file-list">
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <i className="fas fa-file-alt"></i> {file}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default FileList;

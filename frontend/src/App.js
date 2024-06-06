import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MyForm from './components/Register';
import UploadFile from './components/FileUpload';
import FileList from './components/FileList';
import Graph from './components/Graph';


function App() {
  return (
    <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/newregister" element={<MyForm />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="/files" element={<FileList />} />
            <Route path="/graphical" element={<Graph />} />
        </Routes>
    
  );
}

export default App;
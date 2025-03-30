import React, { useState, useRef } from "react";
import { FileText, Upload, CheckCircle, XCircle, Loader } from "lucide-react";

const ResumeUpload = ({ onUploadSuccess, initialResume = null }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(initialResume);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid document (PDF or Word)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fileURL = URL.createObjectURL(file);
      setFile({
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileURL
      });
      
      if (onUploadSuccess) {
        onUploadSuccess({
          name: file.name,
          type: file.type,
          size: file.size,
          url: fileURL
        });
      }
      
      setUploading(false);
      setError(null);
    } catch (err) {
      setError("Error uploading file. Please try again.");
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    if (onUploadSuccess) {
      onUploadSuccess(null);
    }
  };

  if (file) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between p-3 bg-sky-50 rounded-md">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-sky-600 mr-3" />
            <div>
              <span className="font-medium">{file.name}</span>
              <span className="text-xs text-gray-500 block">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <a 
              href={file.url} 
              className="text-sky-600 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
            <button 
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div
        className={`border-2 ${
          isDragging ? "border-sky-500 bg-sky-50" : "border-dashed border-sky-300 hover:border-sky-400"
        } rounded-md p-6 transition-all duration-200 ease-in-out`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
        
        <div className="flex flex-col items-center justify-center space-y-3">
          {uploading ? (
            <>
              <Loader className="h-10 w-10 text-sky-500 animate-spin" />
              <p className="text-gray-700">Uploading resume...</p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-sky-500" />
              <p className="text-center text-gray-700">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 text-center">
                PDF or Word (max 5MB)
              </p>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm flex items-center">
          <XCircle className="h-4 w-4 mr-1" /> {error}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
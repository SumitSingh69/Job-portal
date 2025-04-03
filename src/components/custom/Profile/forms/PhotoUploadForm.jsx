import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const PhotoUploadForm = ({ onSubmit, loading, initialData, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.photo || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return <div>{/* Render your form components here */}</div>;
};

export default PhotoUploadForm;

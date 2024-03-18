"use client"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import axios from 'axios';
import React, { useState } from 'react';

const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('http://localhost:8000/images/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const RichTextEditor = ({ value, onChange }: {
    value: any, onChange: any
}) => {

    const [editor, setEditor] = useState(null);

    const handleImageUpload = async (file) => {
      try {
        const response = await uploadImage(file);
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', response.image);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  
    const modules = {
      toolbar: {
        handlers: {
          image: handleImageUpload,
        },
      },
    };


  return (
    <ReactQuill value={value} onChange={onChange} 
        modules={modules}
        ref={(el) => setEditor(el)}
    />
  );
};

export default RichTextEditor;
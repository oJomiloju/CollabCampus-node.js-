import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  // States to handle form inputs
  const state = useLocation().state;
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [title, setTitle] = useState(state?.title || "");
  const [shortDesc, setShortDesc] = useState(state?.desc || "");
  const [longDesc, setLongDesc] = useState(state?.longdesc || "");
  const [category, setCategory] = useState(state?.category || "");
  const [image, setImage] = useState(null); // State for the uploaded image
  const [status, setStatus] = useState(""); // This will show feedback after an action

  // List of categories
  const categories = [
    'All',
    'Civil',
    'Mechanical',
    'Software',
    'Biomedical',
    'Nursing'
  ];

  // Handle submit for both publish and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDesc || !longDesc || !category) {
      setStatus("Please fill out all required fields.");
      return;
    }

    if (image) {
      try {
        const formData = new FormData();
        formData.append('file', image);

        // Send image to the backend
        const res = await axios.post("http://localhost:8800/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
          const filename = res.data;
          // If state exists, perform an update, otherwise, publish
          try {
            state 
            ? await axios.put(`http://localhost:8800/api/posts/${postId}`, {
                title,
                shortDesc,
                longDesc,
                category,
                postimg: filename,
              }, { withCredentials: true })
            : await axios.post(`http://localhost:8800/api/posts`, {
                title,
                shortDesc,
                longDesc,
                category,
                postimg: filename,
                date: Date.now(),
              }, { withCredentials: true });
              navigate('/home');
          }
          catch(err) {
            console.log(err)
          }
        } else {
          setStatus('Failed to upload image.');
        }

      } catch (err) {
        console.error("Error uploading image:", err.message);
        setStatus(`Failed: ${err.response?.data || "Unknown error"}`);
      }
    } else {
      setStatus('No image selected.');
    }
    navigate('/home');
  };

  // Handle image change and store it in state
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{state ? 'Edit Post' : 'Create New Post'}</h1>

      {/* Title input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Short description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg mb-2" htmlFor="shortDesc">Short Description</label>
        <input
          type="text"
          id="shortDesc"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter a short description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </div>

      {/* Long description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg mb-2" htmlFor="longDesc">Long Description</label>
        <textarea
          id="longDesc"
          rows="6"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter a detailed description"
          value={longDesc}
          onChange={(e) => setLongDesc(e.target.value)}
        />
      </div>

      {/* Category selection */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg mb-2" htmlFor="category">Category</label>
        <select
          id="category"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Image upload */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg mb-2" htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={handleImageChange}
        />
      </div>

      {/* Image Preview */}
      {image && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Image Preview:</h2>
          <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      )}

      {/* Submit button for both actions */}
      <div className="flex space-x-4 mt-4">
        <button
          className={`${state ? 'bg-green-600' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg hover:${state ? 'bg-green-500' : 'bg-blue-500'}`}
          onClick={handleSubmit}
        >
          {state ? 'Update' : 'Publish'}
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          onClick={() => setStatus('Saved as draft!')}
        >
          Save as Draft
        </button>
      </div>

      {/* Status message */}
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default Write;

import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import icode from '../assets/images/icode.jpeg'; // Import for placeholder image

const Single = () => {
  const [post, setPost] = useState({});
  const [allPosts, setAllPosts] = useState([]);  // Store all posts
  const [similarPosts, setSimilarPosts] = useState([]);  // Store similar posts
  const location = useLocation();
  const postId = location.pathname.split("/")[2]; 
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current post
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        const postData = res.data;
        console.log(postData)
        setPost(postData);

        // Fetch all posts to find similar ones
        const allRes = await axios.get("http://localhost:8800/api/posts");
        const allData = allRes.data;

        // Filter similar posts based on category
        const filteredPosts = allData.filter(p => p.category === postData.category && p.id !== postData.id);
        setSimilarPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate('/home');
    } catch (error) {
      console.error("Error deleting post:", error.response ? error.response.data : error.message);
    }
  };  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Main project detail */}
        <div className="md:w-2/3 p-4">
          <div className="w-full">
            <img 
              src={post.postimg ? `../upload/${post.postimg}` : icode}
              alt={post.title} 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg mt-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 font-medium">By:</span>
              <span className="ml-2 text-gray-900 font-semibold">{post.username}</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{post.desc}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{post.longdesc}</p>

            {currentUser.username === post.username && (
              <div>
                <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 mt-4">
                <Link to={`/write/${postId}`} state={post}>Edit</Link>
                </button>
                <button onClick={handleDelete} className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600 mt-4 ml-2">
                  Delete
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Posted on:</h3>
                <p className="text-gray-600">{moment(post.date).fromNow()}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Category:</h3>
                <p className="text-gray-600">{post.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar for similar projects */}
        <div className="md:w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Similar Projects</h2>
          <div className="space-y-4 h-96 overflow-y-auto">
            {similarPosts.map(proj => (
              <div key={proj.id} className="flex items-start border-b pb-4">
                <div className="w-24 h-24 mr-4">
                  <img 
                    src={post.postimg ? `../upload/${post.postimg}` : icode}
                    alt={proj.title} 
                    className="w-full h-full object-cover rounded-lg shadow-md" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{proj.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">{proj.desc}</p>
                  <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
                    <Link to={`/post/${proj.id}`}>Read More</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;

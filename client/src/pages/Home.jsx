import React, { useEffect, useState } from 'react';
import icode from '../assets/images/icode.jpeg'; // Fallback image
import { Link } from 'react-router-dom';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);  // Store all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Posts to display
  const [selectedCategory, setSelectedCategory] = useState('All'); // Track selected category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8800/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setAllPosts(data); // Store all posts in state
        setFilteredPosts(data); // Initially show all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  // Filter posts based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(allPosts); // Show all posts if 'All' is selected
    } else {
      setFilteredPosts(allPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, allPosts]);

  return (
    <div className="container mx-auto p-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          "All",
          "Civil",
          "Mechanical",
          "Software",
          "Computer Science",
          "Biomedical",
          "Nursing",
        ].map((major) => (
          <button
            key={major}
            onClick={() => setSelectedCategory(major)} // Update selected category on click
            className={`px-6 py-2 rounded-full text-white font-semibold ${
              selectedCategory === major ? 'bg-green-800' : 'bg-green-700'
            } hover:bg-green-600 transition ease-in-out duration-300 shadow-md`}
          >
            {major}
          </button>
        ))}
      </div>

      {/* Posts Section */}
      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available in this category.</p>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0"
            >
              {/* Post Image */}
              <div className="md:w-1/3 p-4">
                <img
                  src={post.img || icode}
                  alt={post.title}
                  className="w-full h-auto max-h-64 object-cover rounded-md shadow-lg"
                />
              </div>

              {/* Post Content */}
              <div className="md:w-2/3 p-4 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.desc}</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">
                <Link to={`/post/${post.id}`}>
                    Read More
                </Link>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

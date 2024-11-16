import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/profile/${id}`, { withCredentials: true });
        setProfileData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    fetchProfileData();
  }, [id]);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {/* User Details */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded shadow-md">
        <h1 className="text-4xl font-bold">Welcome, {profileData.user.username}!</h1>
        <p className="mt-2 text-lg">Email: {profileData.user.email}</p>
      </div>

      {/* User Posts */}
      <div className="mt-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Your Posts</h2>
        {profileData.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.posts.map((post) => (
              <div key={post.id} className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={post.postimg ? `../upload/${post.postimg}` : "https://via.placeholder.com/150"}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.desc}</p>
                <a
                  href={`/post/${post.id}`}
                  className="inline-block mt-4 text-green-700 hover:underline"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

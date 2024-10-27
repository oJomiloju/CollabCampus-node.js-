import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext); // Access user & logout
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to login after logout
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="text-green-700 font-bold text-xl">
          <Link to="/">Collab Campus</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {currentUser ? (
            <>
              <Link to="/home" className="text-green-700 hover:text-green-600">
                Home
              </Link>
              <Link to="/post" className="text-green-700 hover:text-green-600">
                Post
              </Link>
              <Link to="/contact" className="text-green-700 hover:text-green-600">
                Contact
              </Link>
              <button
                onClick={handleLogout}
                className="text-green-700 hover:text-green-600"
              >
                Logout
              </button>
              <Link to="/profile" className="text-green-700 hover:text-green-600">
                {currentUser.username}
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-green-700 hover:text-green-600">
                Home
              </Link>
              <Link to="/about" className="text-green-700 hover:text-green-600">
                About
              </Link>
              <Link to="/contact" className="text-green-700 hover:text-green-600">
                Contact
              </Link>
              <Link to="/login" className="text-green-700 hover:text-green-600">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-700 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {currentUser ? (
          <>
            <Link
              to="/home"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Home
            </Link>
            <Link
              to="/post"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Post
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Contact
            </Link>
            <Link
              onClick={handleLogout}
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Logout
            </Link>
            <Link
              to="/profile"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              {currentUser.username}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/home"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block py-2 px-4 text-center text-xl font-bold text-green-700 hover:text-green-500"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

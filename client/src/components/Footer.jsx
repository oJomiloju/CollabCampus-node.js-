import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-green-600 py-8">
    <div className="container mx-auto flex flex-col items-center justify-between px-6 lg:flex-row">
      {/* Footer Text */}
      <div className="text-center mb-4 lg:mb-0">
        <h4 className="text-lg font-bold">Collab Campus INC</h4>
        <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col text-center lg:flex-row lg:gap-8 mb-4 lg:mb-0">
        <a href="/about" className="hover:underline mb-2 lg:mb-0">
          About Us
        </a>
        <a href="/services" className="hover:underline mb-2 lg:mb-0">
          Home
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </div>

    </div>
    
  </footer>
  )
}

export default Footer

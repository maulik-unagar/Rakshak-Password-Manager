import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className=" top-0 relative w-full bg-opacity-80 backdrop-blur-lg text-white shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold tracking-wider text-gradient">
                Rakshak
              </div>
            </div>

            {/* Menu (Desktop) */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-[#63e] transition duration-200">
                Home
              </a>
              <a href="#" className="hover:text-[#63e] transition duration-200">
                Features
              </a>
              <a href="#" className="hover:text-[#63e] transition duration-200">
                Pricing
              </a>
              <a href="#" className="hover:text-[#63e] transition duration-200">
                Contact
              </a>
            </div>

            {/* Get Started Button (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#"
                className="px-4 py-2 rounded-lg bg-[#63e] text-black font-semibold hover:bg-[#ffffff] transition duration-200"
              >
                Get Started
              </a>
            </div>

            {/* Hamburger Button */}
            <button
              className="md:hidden text-white hover:text-[#63e] transition duration-200 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Shown when `isMenuOpen` is true) */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-70 absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-white space-y-4">
            <a href="/" className="block py-2 px-4">Home</a>
            <a href="#" className="block py-2 px-4">Features</a>
            <a href="#" className="block py-2 px-4">Pricing</a>
            <a href="#" className="block py-2 px-4">Contact</a>
            <a
              href="#"
              className="block py-2 px-4 mt-4 rounded-lg bg-[#63e] text-black font-semibold hover:bg-[#ffffff] transition duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

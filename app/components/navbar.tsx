"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Import icons for the menu toggle button

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white"><span className="text-yellow-300">Space</span>Scape</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/home" className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200">
              Home
            </Link>
            <Link href="/price" className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/signin" className="text-white hover:text-yellow-300 font-semibold transition-colors duration-200">
              Sign In
            </Link>
            <Link href="/signup" className="bg-yellow-500 text-indigo-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block text-white px-3 py-2 rounded-md text-base font-semibold hover:bg-indigo-700 transition-colors duration-200">
            Home
          </Link>
          <Link href="/pricing" className="block text-white px-3 py-2 rounded-md text-base font-semibold hover:bg-indigo-700 transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/signin" className="block text-white px-3 py-2 rounded-md text-base font-semibold hover:bg-indigo-700 transition-colors duration-200">
            Sign In
          </Link>
          <Link href="/signup" className="block text-indigo-900 bg-yellow-500 px-3 py-2 rounded-md text-base font-semibold hover:bg-yellow-400 transition-colors duration-200">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

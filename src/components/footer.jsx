import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black p-4 mt-10 px-4 sm:px-10 md:px-20 lg:px-40">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <span className="text-sm">Made with ❤️ by </span>
          <a href="mailto:siddharth@techoptimum.org" className="text-sm hover:underline">Siddharth Duggal</a>
          <span className="text-sm"> and </span>
          <a href="mailto:aditya@techoptimum.org" className="text-sm hover:underline">Aditya Sahasranam</a>
        </div>
        <a href="/press" className="text-center">
          <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-150 ease-in-out">
            Press Release
          </button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;

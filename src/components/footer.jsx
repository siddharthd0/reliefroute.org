import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black p-4 mt-10 px-40">
      <div className="container mx-auto flex justify-between items-center">
        <div>
        <span className="text-sm">Made with ❤️ by </span>
        <a href="mailto:siddharth@techoptimum.org" className="text-sm hover:underline">Siddharth Duggal</a>
        <span className="text-sm"> and </span>
        <a href="mailto:aditya@techoptimum.org" className="text-sm hover:underline">Aditya Sahasranam</a>
        </div>
        <button className="">Press Release</button>
      </div>
    </footer>
  );
}

export default Footer;

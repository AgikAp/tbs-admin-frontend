// RippleButton.js
import React from 'react';
import Ripples from 'react-ripples';

const RippleButton = ({ children, className, ...props }) => {
  return (
    <Ripples
      className={`relative inline-block overflow-hidden ${className}`}
      {...props}
    >
      <button
        className="relative z-10 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
      >
        {children}
      </button>
    </Ripples>
  );
};

export default RippleButton;

"use client";

import React from "react";

interface ConnectBtnProps {
  content?: string;
}

const BigButton: React.FC<ConnectBtnProps> = ({ content }) => {
  return (
    <button
      type="submit"
      className="bg-transparent border border-blue-700 hover:bg-blue-800
                 py-2 px-6 text-blue-700 hover:text-white rounded-full
                 transition duration-300 ease-in-out">
      {content}
    </button>
  );
};

export default BigButton;

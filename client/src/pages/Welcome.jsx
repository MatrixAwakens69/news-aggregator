import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 backdrop-blur-sm">
      <div className="text-center p-10 bg-gray-300 bg-opacity-80 rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to News Aggregator
        </h1>
        <p className="font-semibold text-xl text-gray-700 mb-8">
          Get started by signing up or signing in to access your account.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

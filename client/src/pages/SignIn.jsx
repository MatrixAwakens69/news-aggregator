import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const accountCreated = location.state?.accountCreated;
  const [showMessage, setShowMessage] = useState(accountCreated);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Hide the message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-500">
      {showMessage && (
        <div
          className="absolute top-0 left-0 right-0 bg-green-100 border-b-4 border-green-500 text-green-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>Account successfully registered. Please sign in.</p>
        </div>
      )}
      <div className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

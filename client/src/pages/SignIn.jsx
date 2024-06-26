import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const accountCreated = location.state?.accountCreated;
  const [showMessage, setShowMessage] = useState(accountCreated);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

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
        <h1 className="text-5xl font-bold text-gray-800 mb-10">Sign In</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full text-2xl rounded-lg p-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full text-2xl rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white text-2xl font-bold py-2 px-4 rounded transition duration-300 w-full"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

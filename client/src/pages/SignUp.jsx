import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // State for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
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
      // Handle success (e.g., navigate to another page, show message)
      navigate("/signin", { state: { accountCreated: true } });
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

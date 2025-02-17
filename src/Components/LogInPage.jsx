import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import logo from "../assets/himalaya.png";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ username: "", password: "" });

    // Validation
    let formValid = true;
    let errors = {};

    if (!credentials.username) {
      errors.username = "Please enter your username";
      formValid = false;
    }

    if (!credentials.password) {
      errors.password = "Please enter your password";
      formValid = false;
    }

    if (!formValid) {
      setErrors(errors);
      return;
    }

    // Mock authentication (Replace with real API auth)
    if (credentials.username === "admin@gmail.com" && credentials.password === "admin") {
      localStorage.setItem("token", "sample-auth-token");
      toast.success("Login Successful!");
      navigate("/"); // Redirect to home page
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Dotted Background */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-green-800 relative">
        {/* Dotted Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:15px_15px] opacity-20"></div>

        {/* Logo & Text */}
        <img src={logo} alt="logo" width={350}></img>
        <h1 className="text-3xl text-white relative z-10 font-bold">Meghalaya Health Welfare</h1>
        <h1 className="text-lg text-white relative z-10">© 2025 All rights reserved</h1>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-2/3 flex justify-center items-center">
        <div className="w-[400px] p-8 rounded-3xl shadow-2xl border">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <label className="flex flex-col">
              <span className="mb-2">Username:</span>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="w-full border-2 border-green-400 px-3 py-2 rounded-xl focus:border-green-400"
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
            </label>

            <label className="text-green-900 flex flex-col">
              <span className="mb-2">Password:</span>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full border-2 border-green-400 px-3 py-2 rounded-xl"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </label>

            <button
              type="submit"
              className="w-full bg-green-700 text-white rounded-3xl py-3 text-xl hover:bg-green-600 mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Powered by Section */}
      <div className="absolute bottom-0 right-0 p-4">
        <a className="underline text-end text-green-900 text-lg" href="https://sirobilt.com/">
          @Powered by Sirobilt
        </a>
      </div>
    </div>
  );
};

export default Login;

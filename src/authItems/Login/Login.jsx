import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContexts/AuthContexts";
import Loader from "../../components/Loader/Loader";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useauth/useAuth";
import axiosInstance from "../../hooks/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, googleLogin, githubLogin, facebookLogin, loading } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      navigate("/dashboard/student");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };


const handleGoogleLogin = async () => {
  try {
    const userCredintial = await googleLogin();
    const user = userCredintial?.user;

    // payload
    const userData = {
      fullName: user?.displayName || "user",
      email: user?.email,
      firebaseUid: user?.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/users", userData);
      navigate("/dashboard/student")
    } catch (postError) {
      console.error(
        "Error saving user to MongoDB:",
        postError.response?.data || postError.message
      );
    }
  } catch (err) {
    setError(err.message || "Failed to login with Google. Please try again.");
  }
};


const handleGithubLogin = async () => {
  try {
    const result = await githubLogin();
    const user = result?.user;

    const userData = {
      fullName: user?.displayName || "user",
      email: user?.email,
      firebaseUid: user?.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/users", userData);
    } catch (postError) {
      console.error(
        "Error saving GitHub user to MongoDB:",
        postError.response?.data || postError.message
      );
    }

    navigate("/dashboard/student");
  } catch (err) {
    setError(err.message || "GitHub login failed.");
  }
};


const handleFacebookLogin = async () => {
  try {
    const result = await facebookLogin();
    const user = result?.user; // Firebase user object

    const userData = {
      fullName: user?.displayName || "user",
      email: user?.email,
      firebaseUid: user?.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/users", userData);
    } catch (postError) {
      console.error(
        "Error saving Facebook user to MongoDB:",
        postError.response?.data || postError.message
      );
    }

    navigate("/dashboard/student");
  } catch (err) {
    setError(err.message || "Facebook login failed.");
  }
};


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Side: Form */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
            <h1 className="text-primary text-3xl font-bold mb-2 text-center">
              Welcome to StuNote
            </h1>
            <p className="text-secondary mb-6 text-center">
              Sign in to continue or register a new account
            </p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
              >
                Login
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleGoogleLogin}
                className="p-3 rounded-full bg-white shadow hover:shadow-md transition"
              >
                <FcGoogle size={24} />
              </button>
              <button
                onClick={handleFacebookLogin}
                className="p-3 rounded-full bg-blue-400 text-white shadow hover:shadow-md transition"
              >
                <FaFacebookF size={24} />
              </button>
              <button
                onClick={handleGithubLogin}
                className="p-3 rounded-full bg-gray-700 text-white shadow hover:shadow-md transition"
              >
                <FaGithub size={24} />
              </button>
            </div>

            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link
                to={"/auth/student/signup"}
                className="text-primary font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Info / Illustration */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-indigo-50 p-8 rounded-2xl shadow-2xl">
          <div className="text-center max-w-xs">
            <h2 className="text-primary text-3xl font-bold mb-4">
              Stay organized.
            </h2>
            <p className="text-secondary text-lg">
              Study smarter, not harder. Manage your notes, tasks, and calendar
              all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

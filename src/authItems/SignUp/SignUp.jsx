import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContexts/AuthContexts";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../../components/Loader/Loader";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { createUser, googleLogin, githubLogin, facebookLogin, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-7xl w-full bg-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8">
        {/* Form Side */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-primary text-3xl font-bold mb-2 text-center">
            Create Account
          </h1>
          <p className="text-secondary mb-6 text-center">
            Sign up to start your StuNote journey
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your email"
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
                placeholder="Enter password"
                required
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirm password"
                required
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button
              onClick={googleLogin}
              className="p-3 rounded-full bg-white shadow hover:shadow-md transition"
            >
              <FcGoogle size={24} />
            </button>
            <button
              onClick={facebookLogin}
              className="p-3 rounded-full bg-blue-400 text-white shadow hover:shadow-md transition"
            >
              <FaFacebookF size={24} />
            </button>
            <button
              onClick={githubLogin}
              className="p-3 rounded-full bg-gray-700 text-white shadow hover:shadow-md transition"
            >
              <FaGithub size={24} />
            </button>
          </div>

          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to={"/auth/student/login"}
              className="text-primary font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Side Info */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-indigo-50 p-8 rounded-2xl shadow-2xl">
          <div className="text-center max-w-xs">
            <h2 className="text-primary text-3xl font-bold mb-4">
              Join StuNote Today
            </h2>
            <p className="text-secondary text-lg">
              Organize your study, track tasks, manage calendar, and stay productive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
export function Login() {
  const email = useRef();
  const password = useRef();
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const signupPage = () => {
    navigate("/Signup");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          Sign up to explore more features!
        </p>
        <form className="mt-8 space-y-6">
          {/* Full Name */}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
              placeholder="Enter your email"
              ref={email}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
              placeholder="Create a password"
              ref={password}
            />
          </div>

          {/* Terms and Conditions */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            >
              Login
            </button>
          </div>

          {/* Social Sign-Up Buttons */}
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            onClick={signupPage}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

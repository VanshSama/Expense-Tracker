import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppProvider';
import { motion } from 'framer-motion';

function Login() {
  const { login, register } = useAppContext();

  const [state, setState] = useState('login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (state === 'sign-up') {
        await register({ name, email, password });
        setState('login');
      } else {
        await login({ email, password });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-2xl bottom-10 right-10" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full sm:w-96 border border-white/20 text-gray-800 relative z-10"
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <img src="./logo.png" alt="Logo" className="w-14 h-14 mb-3 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Xpns
          </h1>
          <p className="text-sm font-medium text-gray-600 mt-1">Track Your Cash Flow</p>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          {state === "sign-up" ? "Create account" : "Welcome back"}
        </h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          {state === "sign-up" ? "Join us today" : "Login to continue"}
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "sign-up" && (
            <input
              type="text"
              className="w-full p-3 border border-gray-300/50 rounded-xl bg-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            className="w-full p-3 border border-gray-300/50 rounded-xl bg-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300/50 rounded-xl bg-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : state === "sign-up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch */}
        <div className="text-center mt-4">
          {state === "sign-up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-indigo-600 cursor-pointer hover:underline"
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                className="text-indigo-600 cursor-pointer hover:underline"
                onClick={() => setState("sign-up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Login;

"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "amsports@gmail.com" && password === "amsport123") {
      toast.success("Login successful!");
      setTimeout(() => onLogin(), 1500); // Delay to let toast show
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
        
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="dark"
      />
    </div>
  );
}

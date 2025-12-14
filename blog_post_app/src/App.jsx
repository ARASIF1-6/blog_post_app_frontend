import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <nav className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">MyBlog</Link>

          <div className="flex items-center gap-4">
            <Link className="text-sm" to="/">Home</Link>
            {token ? (
              <>
                <Link className="text-sm" to="/create">Create Post</Link>
                <Link className="text-sm" to="/dashboard">Dashboard</Link>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link className="text-sm" to="/register">Register</Link>
                <Link className="text-sm" to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

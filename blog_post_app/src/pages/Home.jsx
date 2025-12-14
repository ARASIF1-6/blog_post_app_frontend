import React, { useEffect, useState } from "react";
import { api } from "../api";
import BlogCard from "../components/BlogCard";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await api.get("/blogpost");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!q) return fetchPosts();
    try {
      const res = await api.get(`/blogpost/${q}`); // search by id per your API
      setPosts(res.data ? [res.data] : []);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  }

  function handleDeleted(id) {
    setPosts((p) => p.filter(x => x.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Register / Login box */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Account</h2>

          {token ? (
            <div>
              <p className="text-sm mb-3">You are logged in.</p>
              <button onClick={() => navigate("/dashboard")} className="bg-blue-600 text-white px-3 py-1 rounded">Dashboard</button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/register" className="block bg-green-600 text-white p-3 rounded text-center">Register</Link>
              <Link to="/login" className="block bg-blue-600 text-white p-3 rounded text-center">Login</Link>
            </div>
          )}
        </div>

        {/* Search box */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Search by ID</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter ID (e.g. 4)"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 rounded">Search</button>
          </form>
        </div>
      </div>

      {/* Create quick button (if logged in) */}
      {token && (
        <div>
          <Link to="/create" className="bg-emerald-600 text-white px-4 py-2 rounded">Create New Post</Link>
        </div>
      )}

      {/* posts grid */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onDeleted={handleDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

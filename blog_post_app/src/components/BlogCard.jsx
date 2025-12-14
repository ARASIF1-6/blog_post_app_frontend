// shows post and update/delete when logged in
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE, api } from "../api";

export default function BlogCard({ post, onDeleted }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function getImageFullUrl(imageUrl) {
    if (!imageUrl) return "";
    // imageUrl expected like "/uploads/filename.jpg"
    const parts = imageUrl.split("/");
    const fileName = parts[parts.length - 1];
    return `${API_BASE}/blogpost/image/${fileName}`;
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/blogpost/delete/${post.id}`);
      onDeleted && onDeleted(post.id);
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {post.imageUrl && (
        <img
          src={getImageFullUrl(post.imageUrl)}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 text-gray-600">{post.content}</p>

        <div className="mt-4 flex gap-2">
          {token && (
            <>
              <button
                onClick={() => navigate(`/update/${post.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-auto text-sm text-blue-600"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
}

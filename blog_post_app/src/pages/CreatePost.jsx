import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    nav("/login");
    return null;
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.image) return alert("Image required");
    const fd = new FormData();
    fd.append("Title", form.title);
    fd.append("Content", form.content);
    fd.append("Image", form.image);

    try {
      await api.post("/blogpost/create", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Created");
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl mb-4">Create Post</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        <textarea className="w-full border px-3 py-2 rounded" placeholder="Content" value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
        <input type="file" accept="image/*" onChange={e=>setForm({...form, image: e.target.files[0]})} />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          <button type="button" onClick={()=>nav("/")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

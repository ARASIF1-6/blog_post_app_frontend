import React, { useEffect, useState } from "react";
import { api, API_BASE } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost(){
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", image: null });

  const token = localStorage.getItem("token");
  if (!token) {
    nav("/login");
    return null;
  }

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await api.get(`/blogpost/${id}`);
        setPost(res.data);
        setForm({ title: res.data.title, content: res.data.content, image: null });
      }catch(e){
        console.error(e);
        alert("Load failed");
      }
    })();
  },[id]);

  async function submit(e){
    e.preventDefault();
    const fd = new FormData();
    fd.append("Title", form.title);
    fd.append("Content", form.content);
    if (form.image) fd.append("Image", form.image);

    try{
      await api.put(`/blogpost/update/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Updated");
      nav("/");
    }catch(e){
      console.error(e);
      alert("Update failed");
    }
  }

  if (!post) return <p>Loading...</p>;

  function imagePreview(){
    if (!post.imageUrl) return null;
    const parts = post.imageUrl.split("/");
    const fileName = parts[parts.length - 1];
    return `${API_BASE}/blogpost/image/${fileName}`;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl mb-4">Update Post</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        <textarea className="w-full border px-3 py-2 rounded" placeholder="Content" value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
        {post.imageUrl && <img src={imagePreview()} alt="preview" className="w-full h-44 object-cover rounded" />}
        <input type="file" accept="image/*" onChange={e=>setForm({...form, image: e.target.files[0]})} />
        <div className="flex gap-2">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded">Update</button>
          <button type="button" onClick={()=>nav("/")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

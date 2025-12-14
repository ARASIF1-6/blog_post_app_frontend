<div align="center">

# 📰 Blog Post App – Frontend

A modern and responsive frontend application for managing and displaying blog posts  
Built with a clean UI and seamless backend integration

![GitHub repo size](https://img.shields.io/github/repo-size/ARASIF1-6/blog_post_app_frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/ARASIF1-6/blog_post_app_frontend)
![GitHub stars](https://img.shields.io/github/stars/ARASIF1-6/blog_post_app_frontend?style=social)

</div>

---

## 📌 Overview

**Blog Post App Frontend** is the client-side application that consumes the Blog Post Backend API.  
It allows users to **view, create, update, and delete blog posts** through a clean and user-friendly interface.

This project is designed to demonstrate **real-world frontend development practices** and smooth API integration.

---

## ✨ Features

- 📄 View all blog posts
- ➕ Create new blog posts
- ✏️ Edit existing blog posts
- 🗑️ Delete blog posts
- 🔄 Real-time API integration
- 📱 Fully responsive design
- 🎯 Clean UI & structured components

---

## 🧩 Tech Stack

| Technology | Purpose |
|-----------|--------|
| **HTML5** | Structure |
| **CSS3** | Styling |
| **JavaScript (ES6+)** | Logic |
| **React.js** | UI Framework |
| **Axios / Fetch API** | API communication |
| **Bootstrap / Custom CSS** | Responsive design |

> 🔗 Backend Repository:  
👉 https://github.com/ARASIF1-6/blog_post_app_backend

---

## 📁 Project Structure
blog_post_app_frontend/
│
├── src/
│ ├── components/
│ │ ├── BlogList.jsx
│ │ ├── BlogForm.jsx
│ │ └── BlogCard.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── CreatePost.jsx
│ │
│ ├── services/
│ │ └── api.js
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── public/
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

### 🔹 Prerequisites

Make sure you have installed:

- **Node.js (v18+)**
- **npm or yarn**
- Backend API running locally

---

### ▶️ Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARASIF1-6/blog_post_app_frontend.git
   cd blog_post_app_frontend

2. **Install dependencies**
   ```bash
   npm install

3. **Start development server**
   ```bash
   npm run dev

4. **Open in browser:**
   ```bash
   http://localhost:5173

## API Integration

The frontend communicates with the backend using REST APIs.

Example API configuration:
```bash
const API_BASE_URL = "https://localhost:7255/api";



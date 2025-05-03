# 📝 MongoDB Blog App

A full-stack blog web application built using **React.js** for the frontend and **MongoDB + Express.js** for the backend. Users can create, update, view, and delete blog articles with a clean and responsive UI.

---

## 🚀 Features

- 🖊️ Create and edit blog articles  
- 📑 View article list and detailed content  
- ❌ Delete selected blog  
- 🕵️ Real-time interface updates without reloads  
- 🔍 Search functionality  
- 🧭 Sidebar navigation for blog titles  
- 🎨 Styled layout using CSS for consistent user experience  
- ✅ Backend powered by Express + MongoDB Atlas/local

---

## 📁 Folder Structure

```
blog-project-mongodb/
│
├── server/
│   ├── models/
│   │   └── Article.js         # Mongoose schema for blogs
│   ├── routes/
│   │   └── articles.js        # API routes for CRUD operations
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js              # Express server setup
│
├── client/
│   ├── assets/
│   └── src/
│       ├── components/
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── Article.jsx
│       │   ├── ArticleEntry.jsx
│       │   └── Nav.jsx
│       └── main.jsx
├── .gitignore
├── README.md
└── package.json
```

---

## 🛠️ Tech Stack

| Frontend |   Backend    | Database |
|----------|--------------|----------|
| React    | Node.js      | MongoDB  |
| CSS      | Express.js   | Mongoose |

---

## 🔧 Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

- Start the backend server:

```bash
node server.js
```

- Create a .env file in /server with:

```bash
MONGO_URI=your_mongo_db_connection_string
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📦 API Endpoints

| Method | Endpoint   | Description          |
| ------ | ---------- | -------------------- |
| GET    | /          | Fetch all articles   |
| POST   | /          | Create new article   |
| PUT    | /:id       | Update article by ID |
| DELETE | /id        | Delete article by ID |

--- 

## 📸 Screenshots

![View](https://github.com/bismah-nasir/blog-mongodb/blob/37a3e74c732dd8f9e8ce309a29c45e046ccc2176/mongodb-blog.PNG)

---

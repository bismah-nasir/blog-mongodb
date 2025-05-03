import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import "./App.css";

export default function App() {
	const [articles, setArticles] = useState([]);
	const [article, setArticle] = useState(null);
	const [title, setTitle] = useState("");
	const[body, setBody] = useState("");	
	const [writing, setWriting] = useState(false);
	const [searchId, setSearchId] = useState("");
	
	// useEffect(() => {
	// 	console.log("Articles:", articles);
	// }, [articles]);

	// Fetch all articles
	useEffect(() => {
		fetchAllArticles();
	  }, []);
	

	const fetchAllArticles = async () => {
		try {
		  const res = await fetch("http://localhost:5000/articles");
		  const data = await res.json();
	  
		  // Sort by 'date' field (latest first)
		  const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
	  
		  setArticles(sorted);
		} catch (err) {
		  console.error("Fetch failed:", err);
		}
	};	  


	// Create Article
	const handleSubmit = async () => {
		event.preventDefault(); // This stops the full page refresh
		try {
		  const res = await fetch("http://localhost:5000/articles", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, body }),
		  });

		  if (!res.ok) throw new Error("Failed to create");
	  
		  const data = await res.json();
		  console.log("Created:", data);

		  setArticles([data, ...articles]);

		  setWriting(false); // Close the ArticleEntry
		  setArticle(data);  // Show the new article

		  setTitle("");
		  setBody("");
		} catch (err) {
		  console.error("Create failed:", err);
		}
	  };
	
	// Delete Article
	const handleDelete = async () => {
		if (!article) return;
		const confirmDelete = window.confirm("Are you sure you want to delete this article?");
		if (!confirmDelete) return;
	
		try {
		  await fetch(`http://localhost:5000/articles/${article._id}`, {
			method: "DELETE",
		  });
		  setArticle(null);
		  fetchAllArticles();
		} catch (err) {
		  console.error("Delete failed:", err);
		}
	};

	// Update Article
	const handleUpdate = async () => {
		if (!article) return;
		const newTitle = prompt("Enter new title:", article.title);
		const newBody = prompt("Enter new body:", article.body);
		if (!newTitle || !newBody) return;
	
	// 	try {
	// 	  await fetch(`http://localhost:5000/articles/${article._id}`, {
	// 		method: "PUT",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ title: newTitle, body: newBody }),
	// 	  });
	// 	  fetchAllArticles();
	// 	  setArticle(null);
	// 	  alert("Updated!");
	// 	} catch (err) {
	// 	  console.error("Update failed:", err);
	// 	}
	// };
	try {
		const res = await fetch(`http://localhost:5000/articles/${article._id}`, {
		  method: "PUT",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({ title: newTitle, body: newBody }),
		});
	
		if (!res.ok) throw new Error("Update failed");
		const updatedArticle = await res.json(); // assuming server returns the updated one
	
		await fetchAllArticles();
		setArticle(updatedArticle); // keep it selected
		alert("Updated!");
	  } catch (err) {
		console.error("Update failed:", err);
	  }
	};

	// Search by ID
	const handleSearchById = async (e) => {
		e.preventDefault();
		try {
		  const res = await fetch(`http://localhost:5000/articles/${searchId.trim()}`);
		  if (!res.ok) throw new Error("Not found");
		  const data = await res.json();
		  setArticle(data);
		} catch (err) {
		  console.error("Search failed:", err);
		  alert("Article not found.");
		}
	};
	

	return (
		<div className="App">

		  {/* Header */}
		  <header className="app-header">
			<div className="header">
			  <span className="header-title">Blog</span>
			  <button onClick={() => setWriting(true)}>New Article</button>
			</div>
		  </header>
	
		  {/* Search Bar */}
		  <form onSubmit={handleSearchById} className="search-bar">
			<input
			  type="text"
			  placeholder="Search by ID"
			  value={searchId}
			  onChange={(e) => setSearchId(e.target.value)}
			  className="search-input"
			/>
			<button type="submit" className="search-button">Search</button>
		  </form>
	
		  {/* Main Content */}
		  <div className="main-section">
			{/* Sidebar */}
			<div className="nav-sidebar">
			  <h1 className="nav-heading">Articles</h1>
			  <Nav articles={articles} setArticle={setArticle} selectedArticle={article} />
			</div>
	
			{/* Right Section */}
			<div className="article-view">
			  {writing ? (
				<ArticleEntry
				  title={title}
				  setTitle={setTitle}
				  body={body}
				  setBody={setBody}
				  handleSubmit={handleSubmit}
				/>
				
			  ) : (
				<>
				  <Article article={article} />
				  {article && (
					<div className="action-buttons">
					  <button onClick={handleUpdate}>Update</button>
					  <button onClick={handleDelete}>Delete</button>
					</div>
				  )}
				</>
			  )}
			</div>
		  </div>
		</div>
	  );
	}
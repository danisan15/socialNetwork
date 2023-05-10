import React, { useState, useEffect } from "react";
import axios from "axios";
import NewPostForm from "../components/NewPostForm";
import "../styles/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get("/api/user")
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));

    // Fetch posts
    axios
      .get("/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleNewPost = (newPost) => {
    // Add new post to state
    setPosts([...posts, newPost]);

    // Send new post to server
    axios
      .post("/api/posts", newPost)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to My Social Network</h1>
        {user && <p>Hello, {user.name}!</p>}
      </header>
      <div>
        <h2>Latest Posts</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              Posted by {post.author} on {post.date}
            </p>
          </div>
        ))}
      </div>
      {user && (
        <div>
          <h2>New Post</h2>
          <NewPostForm onNewPost={handleNewPost} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

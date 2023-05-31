import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import NewPostForm from "../components/NewPostForm";
import "../styles/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user data
    let userEmail = {
      email: sessionStorage.getItem("email"),
    };
    sessionStorage.clear();
    axios
      .post("http://localhost:3000/getuserinfo", userEmail)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
    console.log(user);
  }, []);

  useEffect(() => {
    // Fetch posts
    if (user) {
      axios
        .post("http://localhost:3000/getposts", user)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [user, isDeleted, posts.length]);

  const handleNewPost = (newPost) => {
    // Add new post to state
    setPosts([newPost, ...posts]);

    // Send new post to server
    axios
      .post("http://localhost:3000/posts", newPost)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const parentElement = e.target.parentElement;
    const parentKey = parentElement.getAttribute("id");
    const request = {
      data: {
        id: parentKey,
      },
    };
    axios
      .delete("http://localhost:3000/deletepost", request)
      .then((response) => {
        if (response.data) {
          setIsDeleted(!isDeleted);
        }
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to My Social Network</h1>
        {user && <p>Hello, {user.name}!</p>}
      </header>
      <div className="post-section-container">
        {user && (
          <div id="post-section">
            <h2>New Post</h2>
            <NewPostForm onNewPost={handleNewPost} author={user.name} />
          </div>
        )}
        <div className="message-container">
          <h2>Latest Posts</h2>
        </div>
        {posts.length !== 0 && isLoading !== true ? (
          posts.map((post) => (
            <div key={post.id} id={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                Posted by {post.author} on {post.date}
              </p>
              {post.author === user.name ? (
                <button onClick={handleDelete}>
                  <FaTrash className="icon" />
                </button>
              ) : null}
            </div>
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import "../styles/NewPostForm.css";

function NewPostForm({ onNewPost, author }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { title, content, author };
    onNewPost(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} id="post-form">
      <div id="post-form-title">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Add a title for your post"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div id="post-form-content">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          placeholder="Share your thoughts"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default NewPostForm;

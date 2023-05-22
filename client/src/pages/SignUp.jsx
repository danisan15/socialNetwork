import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import "../styles/SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    setEmail(sessionStorage.getItem("email"));
    setPassword(sessionStorage.getItem("password"));
  }, []);

  const handleUsernameChange = async (event) => {
    await setUsername(event.target.value);
    sessionStorage.setItem("username", event.target.value);
  };

  const handleEmailChange = async (event) => {
    await setEmail(event.target.value);
    sessionStorage.setItem("email", event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    sessionStorage.setItem("password", event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await axios.post("http://localhost:3000/user", {
        name: username,
        email: email,
        password: password,
      });
      setLoading(false); // Hide loading screen
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setLoading(false); // Hide loading screen
      console.error(error);
      alert(error.message);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      {/* Conditionally render the loading screen or the form based on the loading state */}
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <FaEnvelope className="icon" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@yourmail.com"
            />
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button type="submit">Sign up</button>
          <p>
            Already have an account?{" "}
            <button type="button" onClick={handleLoginClick}>
              Log in
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LogIn.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const supabaseUrl = "https://sgfywdesnhcqfvpkeyhg.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnl3ZGVzbmhjcWZ2cGtleWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NTUwNDUsImV4cCI6MTk5NzUzMTA0NX0.2XKnp4jowOJpcChy6xDus45p6UO00OrW-JPpZSqRiRQ";

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSignUpClick = () => {
    // Redirect to the sign-up page
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <div className="input-container">
          <FaEnvelope className="icon" />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
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
        <button type="submit">Log in</button>
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={handleSignUpClick}>
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default LogIn;

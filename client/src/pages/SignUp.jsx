import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../styles/SignUp.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    const supabaseUrl = "https://sgfywdesnhcqfvpkeyhg.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnl3ZGVzbmhjcWZ2cGtleWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NTUwNDUsImV4cCI6MTk5NzUzMTA0NX0.2XKnp4jowOJpcChy6xDus45p6UO00OrW-JPpZSqRiRQ";

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      axios.post("/user", {
        name: username,
      });

      if (error) {
        throw error;
      }

      console.log(user);
      console.log(session);

      navigate("/success"); // Redirect to "/dashboard" route if sign-up is successful
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleLoginClick = () => {
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="signup-container">
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
        <button type="submit">Sign up</button>
        <p>
          Already have an account?{" "}
          <button type="button" onClick={handleLoginClick}>
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignUp;

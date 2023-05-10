import reactLogo from "./assets/react.svg";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isRegister, setIsRegister] = useState(true);

  const notRegister = () => {
    console.log("reaction");
    setIsRegister(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

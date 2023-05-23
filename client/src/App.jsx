import reactLogo from "./assets/react.svg";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const handleAuthentication = (bool) => {
    setIsAuthenticated(bool);
    console.log(isAuthenticated);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="*"
            element={<LogIn handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleAuthentication={handleAuthentication} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

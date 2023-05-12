import React from "react";
import SignUp from "../pages/SignUp";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  return <>{users !== null ? { children } : <div>User not found!</div>}</>;
};

export default ProtectedRoutes;

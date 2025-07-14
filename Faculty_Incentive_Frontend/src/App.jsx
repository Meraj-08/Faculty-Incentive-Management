// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Auth/forgotPass";
import LogIn from "./pages/Auth/login.jsx";
import SignUp from "./pages/Auth/signup";
import Admin from "./Components/Admin/Admin.jsx";
import Faculty from "./Components/kome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/faculty/*" element={<Faculty />} />
      </Routes>
    </Router>
  );
}

export default App;

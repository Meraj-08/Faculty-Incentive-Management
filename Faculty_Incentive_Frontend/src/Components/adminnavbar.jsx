import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./ToggleSwitch.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLogout = async () => {
    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData && storedUserData.empId === "cvrcsef002") {
    return (
      <div className="relative bg-gray-800 ">
      <div className="flex justify-between  items-center p-4 w-full"> 
        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✖️' : '☰'}
        </button>
        <div className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row md:space-x-6">
            
          <Link
              to="/home"
              className={`text-white hover:text-blue-300 ${location.pathname === '/home' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/admin/phd"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/phd' ? 'font-bold' : ''}`}
            >
              PhD
            </Link>
            <Link
              to="/admin/journal"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/journal' ? 'font-bold' : ''}`}
            >
              Journal
            </Link>
            <Link
              to="/admin/patent"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/patent' ? 'font-bold' : ''}`}
            >
              Patent
            </Link>
            <Link
              to="/admin/studyleave"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/studyleave' ? 'font-bold' : ''}`}
            >
              Study Leave
            </Link>
            <Link
              to="/admin/tada"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/tada' ? 'font-bold' : ''}`}
            >
              Travelling Allowance
            </Link>
            <Link
              to="/admin/conference"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/conference' ? 'font-bold' : ''}`}
            >
              Conference Proceeding
            </Link>
            <Link
              to="/admin/update"
              className={`text-white hover:text-blue-300 ${location.pathname === '/admin/update' ? 'font-bold' : ''}`}
            >
              Edit Details
            </Link>
          </div>
        </div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200  md:mt-0 md:ml-4"
          >
            Logout
          </button>
      </div>
    </div>
    );
  } else {
    // Render nothing if the user is a "faculty"
    return <>Sorry not accessible</>;
  }
}

export default AdminNavbar;

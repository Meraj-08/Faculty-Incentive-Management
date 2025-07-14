import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../App.css";

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4">
    <div className="flex justify-between items-center w-full mx-auto">
      <div className="flex space-x-6">
        <Link to="/faculty" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty' ? 'font-bold' : ''}`}>
          Home
        </Link>
        <div
          className="relative sub-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link to="#" className={`text-white hover:text-blue-300 ${location.pathname.includes('/faculty/phd') ? 'font-bold' : ''}`}>
            PhD
          </Link>
          {isDropdownOpen && (
            <div className="absolute left-0 mb-2 bg-white shadow-lg rounded-md z-10">
              <Link to="/faculty/prephd" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Pre-PhD
              </Link>
              <Link to="/faculty/colloquium" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Colloquium
              </Link>
              <Link to="/faculty/thesis" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Thesis
              </Link>
            </div>
          )}
        </div>
        <Link to="/faculty/journal" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/journal' ? 'font-bold' : ''}`}>
          Journal
        </Link>
        <Link to="/faculty/patent" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/patent' ? 'font-bold' : ''}`}>
          Patent
        </Link>
        <Link to="/faculty/studyleave" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/studyleave' ? 'font-bold' : ''}`}>
          Study Leave
        </Link>
        <Link to="/faculty/conference" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/conference' ? 'font-bold' : ''}`}>
          Conference Proceedings
        </Link>
        <Link to="/faculty/tada" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/tada' ? 'font-bold' : ''}`}>
          Travelling Allowance
        </Link>
        <Link to="/faculty/update" className={`text-white hover:text-blue-300 ${location.pathname === '/faculty/update' ? 'font-bold' : ''}`}>
          Edit Details
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Logout
      </button>
    </div>
  </div>
  );
}

export default NavbarComponent;

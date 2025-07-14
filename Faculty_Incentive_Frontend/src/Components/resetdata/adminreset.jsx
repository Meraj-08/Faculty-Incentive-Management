// src/components/UserRegistration.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";


const SERVER = import.meta.env.VITE_SERVER
function AdminUpdate() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    Department: "",
    Designation: "",
    Name: "",
    password: "",
    Phone: 1,
    email: "",
    Gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend
    fetch(`${SERVER}/api/users/update/${storedUserData.empId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clicking();
        // navigate("/home");
        // You can add further handling, e.g., showing a success message
      });
  };
  const clicking = () => {
    toast(`${storedUserData.empId} details updated successfully!`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
  <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
    <h1 className="text-3xl font-semibold text-center text-gray-800">User Registration</h1>
    <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6 mt-2">
        <h2 className="text-xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
          <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
          <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
        </div>
      </div>
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-medium" htmlFor="Department">Department:</label>
            <input
              type="text"
              id="Department"
              name="Department"
              value={user.Department}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="Designation">Designation:</label>
            <input
              type="text"
              id="Designation"
              name="Designation"
              value={user.Designation}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="Name">Name:</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={user.Name}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="Phone">Phone:</label>
            <input
              type="number"
              id="Phone"
              name="Phone"
              value={user.Phone}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="Gender">Gender:</label>
            <input
              type="text"
              id="Gender"
              name="Gender"
              value={user.Gender}
              onChange={handleChange}
              required
              className="border rounded p-3 w-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </main>
</div>

  );
}

export default AdminUpdate;

import React, { useState, useRef } from "react";
import axios from "axios";
import { FaFileUpload, FaSearch, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa"; // Icons for better visuals
import "../../App.css"; // Ensure global styles are included
import HeaderComponent from "../headerComponent";
import NavbarComponent from "../navbarComponent";
import FooterComponent from "../footerComponent";

function Patent() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const [array, setArray] = useState({
    selectedValue: "1",
    textInputs: [""],
  });

  const [formData, setFormData] = useState({
    fid: storedUserData ? storedUserData.empId : "",
    designation: storedUserData ? storedUserData.Designation : "",
    department: storedUserData ? storedUserData.Department : "",
    patentTitle: "",
    patentId: "",
    patentDate: "",
    Genre: "Patent",
  });

  const fileInputRef = useRef();

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    const textInputs = new Array(parseInt(selectedValue)).fill("");
    setArray({ selectedValue, textInputs });
  };

  const handleTextInputChange = (index, value) => {
    const textInputs = [...array.textInputs];
    textInputs[index] = value;
    setArray({ ...array, textInputs });
  };

  const handleReset = () => {
    setArray({ selectedValue: "1", textInputs: [""] });
    setFormData({
      fid: storedUserData.empId,
      designation: storedUserData.Designation,
      department: storedUserData.Department,
      patentTitle: "",
      patentId: "",
      patentDate: "",
      Genre: "Patent",
    });
    setFile([]);
    setMessage("");
    fileInputRef.current.value = "";
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/home/find/patent",
        { data: search }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("patentTitle", formData.patentTitle);
      formDataToSend.append("patentId", formData.patentId);
      formDataToSend.append("patentDate", formData.patentDate);
      formDataToSend.append("Genre", formData.Genre);

      array.textInputs.forEach((text, index) => {
        formDataToSend.append(`author${index + 1}`, text);
      });

      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      const response = await fetch("http://localhost:5000/home/patent/insert", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.message === "PDFs merged and saved successfully") {
        alert("The token generated for this submission is " + data.patentApplication.token);
      }
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error submitting patent application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Patent Applications</h1>
        
        {/* User Information Card */}
        <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6 mt-2">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
            <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
            <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
          </div>
        </div>

        {/* Patent Form */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold">Patent Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium" htmlFor="patentTitle">Patent Title:</label>
                <input
                  type="text"
                  id="patentTitle"
                  value={formData.patentTitle}
                  onChange={(e) => setFormData({ ...formData, patentTitle: e.target.value })}
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="patentId">Patent ID:</label>
                <input
                  type="text"
                  id="patentId"
                  value={formData.patentId}
                  onChange={(e) => setFormData({ ...formData, patentId: e.target.value })}
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium" htmlFor="patentDate">Patent Publishing Date:</label>
                <input
                  type="date"
                  id="patentDate"
                  value={formData.patentDate}
                  max={today}
                  onChange={(e) => setFormData({ ...formData, patentDate: e.target.value })}
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
              <div>
                <label className="font-medium">Number of Inventors:</label>
                <select
                  value={array.selectedValue}
                  onChange={handleDropdownChange}
                  className="border rounded p-3 w-full"
                >
                  {[...Array(6).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {array.textInputs.map((text, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium" htmlFor={`textInput${index}`}>Inventor {index + 1}:</label>
                  <input
                    type="text"
                    id={`textInput${index}`}
                    value={text}
                    onChange={(e) => handleTextInputChange(index, e.target.value)}
                    required
                    className="border rounded p-3 w-full"
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="font-medium">File Upload:</label>
              <div className="flex items-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={onFileChange}
                  ref={fileInputRef}
                  className="border rounded p-3 w-full"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="ml-2 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded"
                >
                  <FaFileUpload />
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Reset
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>

        {/* Search Section */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold">Search Existing Patents</h2>
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Patent ID or Title"
              className="border rounded-l p-3 w-full"
            />
            <button
              onClick={fetchData}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-r flex items-center"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {results.length > 0 ? (
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border-b border-gray-300 p-2">Patent ID</th>
                  <th className="border-b border-gray-300 p-2">Patent Title</th>
                  <th className="border-b border-gray-300 p-2">Publishing Date</th>
                  <th className="border-b border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="border border-gray-300 p-2">{result.patentId}</td>
                    <td className="border border-gray-300 p-2">{result.patentTitle}</td>
                    <td className="border border-gray-300 p-2">{result.patentDate}</td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          result.hasapproved === "Approved"
                            ? "bg-green-500 text-white"
                            : result.hasapproved.toLowerCase() === "pending"  ? "bg-yellow-500 text-white" :  "bg-red-500 text-white"
                        }`}
                      >
                        {result.hasapproved}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Patent;

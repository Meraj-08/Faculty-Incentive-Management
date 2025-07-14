import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileUpload, FaSearch, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";



const SERVER = import.meta.env.VITE_SERVER
function Tada() {
  
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  
  
  const handleReset = () => {
    setFile([]);
    setMessage("");
    setSearch("");
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.post(`${SERVER}/home/find/tada`, { data: search });
      console.log(response.data)
      setResults(response.data);
      console.log(results)
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
      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("tadaFiles", file[i]);
      }

      const response = await fetch(`${SERVER}/home/tada/insert`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error submitting Tada application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Tada Applications</h1>

        <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6 mt-2">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
            <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
            <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
          </div>
        </div>


        
        {/* Tada Form */}
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold">Tada Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium" htmlFor="tadaTitle">Tada Title:</label>
                <input
                  type="text"
                  id="tadaTitle"
                  placeholder="Enter Tada Title"
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="tadaId">Tada ID:</label>
                <input
                  type="text"
                  id="tadaId"
                  placeholder="Enter Tada ID"
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium" htmlFor="tadaDate">Publishing Date:</label>
                <input
                  type="date"
                  id="tadaDate"
                  max={today}
                  required
                  className="border rounded p-3 w-full"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">File Upload:</label>
              <div className="flex items-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={onFileChange}
                  className="border rounded p-3 w-full"
                />
                <button
                  type="button"
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
          <h2 className="text-xl font-semibold">Search Existing Tadas</h2>
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Tada ID or Title"
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
                  <th className="border-b border-gray-300 p-2">Incentive Type</th>
                  <th className="border-b border-gray-300 p-2">TID</th>
                  <th className="border-b border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    
                    <td className="border border-gray-300 p-2">{result.Genre}</td>
                    <td className="border border-gray-300 p-2 text-blue-500 underline">
                        <a
                          href={`${SERVER}/home/pdfwithfirstpagetada/${result._id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {result.token}
                        </a>
                      </td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          result.hasapproved === "Approved"
                            ? "bg-green-500 text-white"
                            :result.hasapproved.toLowerCase() === "pending"  ? "bg-yellow-500 text-white" :  "bg-red-500 text-white"
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
            <p className="text-center text-gray-600 mt-4">No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Tada;

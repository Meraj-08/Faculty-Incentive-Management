import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FaSearch } from "react-icons/fa";


const SERVER = import.meta.env.VITE_SERVER
function Conference() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // const [applications, setApplications] = useState([]);
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const fileInputRef = useRef();
  const handleReset = () => {
    // Reset the form fields and file input
    setFormData({
      ...formData,
      paperTitle: "",
      firstAuthor: "",
      conferenceName: "",
      publisherName: "",
      Genre: "Conference",
      status: "",
      link: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    fetchData()
  }, [])

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    paperTitle: "",
    firstAuthor: "",
    conferenceName: "",
    publisherName: "",
    Genre: "Conference",
    status: "",
    link: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${SERVER}/home/find/conference`,
        { data: search }
      );
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFileChange(e)
    setFile(selectedFiles);
  };

  const getUpdated = (e) => {
    setSearch(e.target.value);
  };

  const handleFileChange = (e) => {
    // Allow users to select multiple files
    const files = Array.from(e.target.files);
    setFormData({ ...formData, pdfFiles: files }); // Changed the field name to match the server
  };
  // console.log(handleFileChange)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("paperTitle", formData.paperTitle);
      formDataToSend.append("firstAuthor", formData.firstAuthor);
      formDataToSend.append("conferenceName", formData.conferenceName);
      formDataToSend.append("publisherName", formData.publisherName);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("Genre", formData.Genre);
      formDataToSend.append("link", formData.link);

      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }
      await fetch(`${SERVER}/home/conference/insert`, {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.conferenceApplication.token
            );
          }
        })
        .catch((error) => {
          setMessage("An error occurred while submitting the form.");
          console.error(error);
        });
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error submitting patent application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
  <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
    <h1 className="text-3xl font-semibold text-center text-gray-800">Conference Proceedings</h1>

    {/* User Information Section */}
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
            <label className="font-medium" htmlFor="paperTitle">Paper Title:</label>
            <input
              type="text"
              id="paperTitle"
              name="paperTitle"
              value={formData.paperTitle}
              onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="firstAuthor">First Author:</label>
            <input
              type="text"
              id="firstAuthor"
              name="firstAuthor"
              value={formData.firstAuthor}
              onChange={(e) => setFormData({ ...formData, firstAuthor: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium" htmlFor="conferenceName">Conference Name:</label>
            <input
              type="text"
              id="conferenceName"
              name="conferenceName"
              value={formData.conferenceName}
              onChange={(e) => setFormData({ ...formData, conferenceName: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="publisherName">Publisher Name:</label>
            <input
              type="text"
              id="publisherName"
              name="publisherName"
              value={formData.publisherName}
              onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium" htmlFor="link">Link:</label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
              className="border rounded p-3 w-full"
            />
          </div>
        </div>
        <div>
          <label className="font-medium">File Upload:</label>
          <input
            type="file"
            name="pdfFiles"
            multiple
            accept=".pdf"
            onChange={onFileChange}
            className="border rounded p-3 w-full"
          />
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
                <td className="border border-gray-300 p-2  text-blue-500 underline">
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
                        :result.hasapproved === "Pending" ? "bg-yellow-500 text-white" :  "bg-red-500 text-white"
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

export default Conference;

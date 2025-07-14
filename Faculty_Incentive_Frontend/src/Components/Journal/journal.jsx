import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FaSearch } from "react-icons/fa";

const SERVER = import.meta.env.VITE_SERVER
function Journal() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // const [applications, setApplications] = useState([]);
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchData()
  }, [])

  const fileInputRef = useRef();
  const handleReset = () => {
    // Reset the form fields and file input
    setFormData({
      ...formData,
      paperTitle: "",
      firstAuthor: "",
      link: "",
      Genre: "Journal",
      // status: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    paperTitle: "",
    firstAuthor: "",
    link: "",
    Genre: "Journal",
    // status: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${SERVER}/home/find/journal`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("paperTitle", formData.paperTitle);
      formDataToSend.append("firstAuthor", formData.firstAuthor);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("Genre", formData.Genre);

      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      await fetch(`${SERVER}/home/journal/insert`, {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.journalApplication.token
            );
          }
        })
        .catch((error) => {
          setMessage("An error occurred while submitting the form.");
          console.error(error);
        });
      //   fetchApplications();
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error submitting patent application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
<main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
  <h1 className="text-3xl font-semibold text-center text-gray-800">Journal Incentive</h1>
  <br />
  
  <div className="space-y-6 mt-2">
    {/* User Information */}
    <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6 mt-2">
        <h2 className="text-xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
          <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
          <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
        </div>
      </div>
    {/* Form Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="paperTitle" className="font-medium">Paper Title:</label>
        <input
          type="text"
          id="paperTitle"
          name="paperTitle"
          value={formData.paperTitle}
          onChange={(e) =>
            setFormData({ ...formData, paperTitle: e.target.value })
          }
          required
          className="border rounded p-3"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="firstAuthor" className="font-medium">First Author:</label>
        <input
          type="text"
          id="firstAuthor"
          name="firstAuthor"
          value={formData.firstAuthor}
          onChange={(e) =>
            setFormData({ ...formData, firstAuthor: e.target.value })
          }
          required
          className="border rounded p-3"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="link" className="font-medium">Link to Scopus/Web of Science:</label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={(e) =>
            setFormData({ ...formData, link: e.target.value })
          }
          required
          className="border rounded p-3"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">File Upload:</label>
        <input
          type="file"
          name="pdfFiles"
          multiple
          accept=".pdf"
          onChange={onFileChange}
          ref={fileInputRef}
          className="border rounded p-3"
        />
      </div>
    </div>

    {/* Submit and Reset Buttons */}
    <div className="flex justify-between mt-6">
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Submit
      </button>
      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Reset
      </button>
    </div>

    {/* Message Display */}
    <div className="message text-center mt-4">
      <p>{message}</p>
    </div>

    {/* Status Section */}
    <div className="mt-6">
      <h2 className="text-2xl font-semibold"> </h2>
      <div className="flex mt-2">
        <input
          type="text"
          onChange={getUpdated}
          value={search}
          placeholder="Search by TID"
          className="border rounded p-3 flex-grow mr-2"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          <FaSearch />
        </button>
      </div>

      {/* Results Table */}
      <table className="result-table w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border-b text-left px-4 py-2">Incentive Type</th>
            <th className="border-b text-left px-4 py-2">TID</th>
            <th className="border-b text-left px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result) => (
              <tr key={result._id}>
                <td className="border-b px-4 py-2">{result.Genre}</td>
                <td className="border-b px-4 py-2  text-blue-500 underline">
                  <a
                    href={`${SERVER}/home/pdfwithfirstpagejournal/${result._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {result.token}
                  </a>
                </td>
                <td className="border-b px-4 py-2">
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
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border-b text-center px-4 py-2 no-results">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</main>

</div>

  );
}

export default Journal;

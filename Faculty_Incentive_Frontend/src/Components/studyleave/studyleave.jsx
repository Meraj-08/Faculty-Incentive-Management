import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaFileUpload, FaSearch, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
// import "./studyleave.css";
import "../../App.css";


const SERVER = import.meta.env.VITE_SERVER
function StudyLeave() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const fileInputRef = useRef();

  useEffect(() => {
    fetchData()
  }, [])
  // const [applications, setApplications] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [file, setFile] = useState([]);
  const handleReset = () => {
    // Reset the form fields and file input
    setFormData({
      ...formData,
      phdtitle: "",
      organisation: "",
      place: "",
      phdprogress: "",
      previousStudyLeave: "",
      startDate: "",
      endDate: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    phdtitle: "",
    organisation: "",
    place: "",
    phdprogress: "",
    previousStudyLeave: "",
    startDate: "",
    endDate: "",
    Genre: "Study Leave",
    // Changed the field name to match the server
  });

  // const fetchApplications = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/study-leave/applications');
  //     setApplications(response.data);
  //   } catch (error) {
  //     console.error('Error fetching study leave applications:', error);
  //   }
  // };

  const handleFileChange = (e) => {
    // Allow users to select multiple files
    const files = Array.from(e.target.files);
    setFormData({ ...formData, pdfFiles: files }); // Changed the field name to match the server
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Add back the preventDefault to prevent form submission

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("phdtitle", formData.phdtitle);
      formDataToSend.append("organisation", formData.organisation);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("phdprogress", formData.phdprogress);
      formDataToSend.append("previousStudyLeave", formData.previousStudyLeave);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("Genre", formData.Genre);

      // Append uploaded files to the FormData
      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      await fetch(`${SERVER}/home/apply`, {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.studyLeaveApplication.token
            );
          }
        })
        .catch((error) => {
          setMessage("An error occurred while submitting the form.");
          console.error(error);
        });
    } catch (error) {
      console.error("Error submitting study leave application:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${SERVER}/home/find/studyleave`,
        { data: search }
      );
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const getUpdated = (e) => {
    setSearch(e.target.value);
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
  };

  return (
    <div className="min-h-screen bg-gray-100">
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Study Leave Application</h1>
      
      {/* User Information Card */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6 mt-2">
        <h2 className="text-xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
          <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
          <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
        </div>
      </div>

      {/* Study Leave Form */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold">Study Leave Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="phdtitle">PhD Title:</label>
              <input
                type="text"
                id="phdtitle"
                name="phdtitle"
                value={formData.phdtitle}
                onChange={(e) =>
                  setFormData({ ...formData, phdtitle: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="organisation">Organisation:</label>
              <input
                type="text"
                id="organisation"
                name="organisation"
                value={formData.organisation}
                onChange={(e) =>
                  setFormData({ ...formData, organisation: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="place">Place:</label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                max={today}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                max={today}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
              <div className="value">
              <label className="font-medium" htmlFor="previousStudyLeave">PHD Progress:</label>
                <input
                  type="text"
                  id="phdprogress"
                  name="phdprogress"
                  value={formData.phdprogress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phdprogress: e.target.value,
                    })
                  }
                  placeholder="progress"
                  required
                  
                  className="border rounded p-3 w-full"
                />
              </div>
            <div>
              <label className="font-medium" htmlFor="previousStudyLeave">No. of Previous Study Leaves:</label>
              <input
                type="text"
                id="previousStudyLeave"
                name="previousStudyLeave"
                value={formData.previousStudyLeave}
                onChange={(e) =>
                  setFormData({ ...formData, previousStudyLeave: e.target.value })
                }
                required
                className="border rounded p-3 w-full"
              />
            </div>
          </div>
          <div>
            <label className="font-medium">File Upload:</label>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={onFileChange}
              ref={fileInputRef}
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
      {/* Study Leave Table */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Submitted Study Leaves</h2>
          {results.length > 0? (
            <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 border-b border-gray-200">Incentive Type</th>
                <th className="py-2 border-b border-gray-200">TID</th>
                <th className="py-2 border-b border-gray-200">Start Date</th>
                <th className="py-2 border-b border-gray-200">End Date</th>
                <th className="py-2 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              { results.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-300 bo">
                  
                  <td className="py-2 border border-gray-300 p-2">{leave.Genre}</td>
                  <td className="py-2 border border-gray-300 p-2  text-blue-500 underline">
                  <a
                          href={`${SERVER}/home/pdfwithfirstpagestudyleave/${leave._id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {leave.token}
                        </a>
                  </td>
                  <td className="py-2 border border-gray-300 p-2">{leave.startDate.split('T')[0]}</td>
                  <td className="py-2 border border-gray-300 p-2">{leave.endDate.split('T')[0]}</td>
                  <td className="py-2 border border-gray-300 p-2">
                  <span
                        className={`px-2 py-1 rounded-full ${
                          leave.hasapproved === "Approved"
                            ? "bg-green-500 text-white"
                            : leave.hasapproved.toLowerCase() === "pending"  ? "bg-yellow-500 text-white" :  "bg-red-500 text-white"
                        }`}
                      >
                        {leave.hasapproved}
                      </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>): <p>No results found.</p>}
        </div>
    </main>
  </div>

  );
}



export default StudyLeave;

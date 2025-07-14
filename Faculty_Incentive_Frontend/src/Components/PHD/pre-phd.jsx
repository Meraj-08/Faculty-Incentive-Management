import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HeaderComponent from "../headerComponent";
import FooterComponent from "../footerComponent";
import NavbarComponent from "../navbarComponent";


const SERVER = import.meta.env.VITE_SERVER
import { useNavigate } from "react-router-dom";
function PrePhd() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // const storedUserData = JSON.parse(localStorage.getItem('userData'));
  console.log(storedUserData);
  const today = new Date().toISOString().split("T")[0];

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    Organisation: "", // Note the capital 'O' here
    location: "",
    Date: "", // Note the capital 'D' here
    Genre: "Pre-PhD",
  });
  const handleReset = () => {
    // Reset the form fields to their initial state
    setFormData({
      fid: "",
      designation: "",
      department: "",
      Organisation: "",
      location: "",
      Date: "",
      Genre: "Pre-PhD",
    });
    setFile([]);
    setMessage("");
    fileInputRef.current.value = "";
  };
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem("userData");

    // Check if the token exists
    if (!jwtToken) {
      console.error("JWT token not found in local storage");
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
  };
  const getUpdated = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("fid", storedUserData.empId);
    formDataToSend.append("designation", storedUserData.Designation);
    formDataToSend.append("department", storedUserData.Department);
    formDataToSend.append("Organisation", formData.Organisation);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("date", formData.Date);
    formDataToSend.append("Genre", formData.Genre);

    // Iterate through the array of selected files and append them to the formData
    for (let i = 0; i < file.length; i++) {
      formDataToSend.append("pdfFiles", file[i]);
    }

    fetch(`${SERVER}/home/inserting`, {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.message === "PDFs merged and saved successfully") {
          alert(
            "The token generated for this submission is " + data.savedPdf.token
          );
        }
      })
      .catch((error) => {
        setMessage("An error occurred while submitting the form.");
        console.error(error);
      });
  };

  const fetchData = async () => {
    try {
      // console.log(search);
      let response = "";
      response = await axios.post(
        `${SERVER}/home/admin/searchphd`,
        {
          data: search,
        }
      );
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const transpose = () => {
    navigate("/");
  };
  if (storedUserData && storedUserData.empId !== "cvrcsef002") {
    return (
      <div className="min-h-screen bg-gray-100">
  <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-5">
    <h1 className="text-3xl font-semibold text-center text-gray-800">Pre-PhD Incentive</h1>

    {storedUserData === null ? (
      <button onClick={transpose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
        Go to Login
      </button>
    ) : (
      <div className="bg-white p-4 rounded-md shadow-md mb-6">

        {/* User Information Section */}

       <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div><strong>Faculty ID:</strong> {storedUserData ? storedUserData.empId : "N/A"}</div>
            <div><strong>Designation:</strong> {storedUserData ? storedUserData.Designation : "N/A"}</div>
            <div><strong>Department:</strong> {storedUserData ? storedUserData.Department : "N/A"}</div>
          </div>
        </div>

        {/* PhD Form */}
        <h2 className="text-xl font-semibold mt-6">PhD Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="Organisation">Institution:</label>
              <input
                type="text"
                id="Organisation"
                name="Organisation"
                value={formData.Organisation}
                onChange={handleInputChange}
                required
                className="border rounded p-3 w-full"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="location">Place:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="border rounded p-3 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="Date">Date Of Completion:</label>
              <input
                type="date"
                id="Date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                required
                max={today}
                className="border rounded p-3 w-full"
              />
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

        <div className="message">
          <p>{message}</p>
        </div>

        {/* Search Section */}
        <h2 className="text-xl font-semibold mt-6">Status</h2>
        <div className="flex items-center mt-4">
          <input
            type="text"
            onChange={getUpdated}
            value={search}
            placeholder="Search"
            className="border rounded-l p-3 w-full"
          />
          <button
            onClick={fetchData}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-r flex items-center"
          >
            Submit
          </button>
        </div>

        {/* Results Table */}
        <h2 className="text-xl font-semibold mt-6">Search Results</h2>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border-b border-gray-300 p-2">Incentive Type</th>
              <th className="border-b border-gray-300 p-2">TID</th>
              <th className="border-b border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result) => (
                <tr key={result._id} className="border-b border-gray-200">
                  <td className="border border-gray-300 p-2">{result.Genre}</td>
                  <td className="border border-gray-300 p-2  text-blue-500 underline">
                    <a
                      href={`${SERVER}/home/get-pdf-with-new-page/${result._id}`}
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
                <td colSpan="3" className="no-results">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </main>
</div>

    );
  } else {
    return "sorry not accessible";
  }
}

export default PrePhd;

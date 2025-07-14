import React from "react";
import "../../Components/ToggleSwitch.css";
import HeaderComponent from "../headerComponent";
import FooterComponent from "../footerComponent";
import AdminNavbar from "../adminnavbar";
import researchImage from "../images/rd.jpg";
import { Route, Routes } from "react-router-dom";
import AdminTada from "./admintada";
import Adminpatent from "./adminphd";
import AdminStudyLeave from "./adminstudyleave";
import AdminJournal from "./adminjournal";
import AdminPHD from "./adminphd";
import AdminConference from "./adminconference";
import AdminUpdate from "../resetdata/adminreset";


function Home() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData && storedUserData.empId === "cvrcsef002") {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontFamily: "cg omega",
              fontStyle: "bold",
              textDecoration: "underline",
              textDecorationColor: "black",
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            Research and Development
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div style={{ flex: 1, padding: "20px" }}>
            <img
              src={researchImage}
              alt="Research"
              style={{
                width: "100%",
                height: "auto",
                border: "2px solid #333",
                borderRadius: "10px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
          <div 
          style={{
            flex:2,
            width: "80%",
            fontSize: "18px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "justify",
            fontFamily: "Arial, sans-serif",
            fontStyle: "bold",
            borderRadius: "10px",
          }}>
            <p>
              Graphic Era Hill University is committed to fostering a culture
               of research and innovation. The university provides modern 
               infrastructure, well-equipped laboratories, and cutting-edge 
               resources to support faculty and student research initiatives.

            </p>

            <p>
                  GEHU actively encourages faculty members to pursue
                   funded research projects, file patents, and publish
                    in reputed journals. The institution offers financial 
                    incentives, seed grants, and paid study leave to support
                     research pursuits and higher education like Ph.D.

            </p>

            <p>
              The university's Research & Development Cell regularly organizes
               conferences, workshops, and seminars on research methodology, 
               intellectual property rights (IPR), and entrepreneurship to 
               promote interdisciplinary collaboration and innovation.

            </p>
          </div>
          
        </div>

      </div>
    );
  } else {
    return <>Sorry not accessible</>;
  }
}

const Admin = () => {
  return (
    <div>
      <HeaderComponent />
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tada" element={<AdminTada />} />
        <Route path="/patent" element={<Adminpatent />} />
        <Route path="/studyleave" element={<AdminStudyLeave />} />
        <Route path="/journal" element={<AdminJournal />} />
        <Route path="/phd" element={<AdminPHD />} />
        <Route path="/conference" element={<AdminConference />} />
        <Route path="/update" element={<AdminUpdate />} />
      </Routes>
      <FooterComponent position="fixed" />
    </div>
  )
}

export default Admin;

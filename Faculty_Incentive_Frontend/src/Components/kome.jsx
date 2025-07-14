import HeaderComponent from "./headerComponent";
import NavbarComponent from "./navbarComponent";
import FooterComponent from "./footerComponent";
import "../App.css";
import { ToastContainer } from "react-toastify";
import researchImage from "./images/rd.jpg";
import { Route, Routes } from "react-router-dom";
import Journal from "./Journal/journal";
import Patent from "./patent/patent";
import Conference from "./conference/conference";
import PrePhd from "./PHD/pre-phd";
import Colloqium from "./PHD/colloquium";
import StudyLeave from "./studyleave/studyleave";
import Thesis from "./PHD/thesis";
import Tada from "./travellingallowance/tada";
import UserRegistration from "./resetdata/reset";

function Kome() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData && storedUserData.empId !== "gehuadmin001") {
    return (
      <div>
        <ToastContainer />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <br />
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
              flex: 2,
              width: "80%",
              fontSize: "18px",
              margin: "0 auto",
              padding: "20px",
              textAlign: "justify",
              fontFamily: "Arial, sans-serif",
              fontStyle: "bold",
              borderRadius: "10px",
            }}
          >
            <p>
              Graphic Era Hill University promotes an active research environment
              with well-established labs and R&D centers. Faculty are supported
              through funding, infrastructure, and collaborations to undertake
              impactful projects in areas like Artificial Intelligence, Advanced
              Materials, and Sustainable Development.
            </p>

            <p>
              The university provides academic leave, financial assistance, and
              incentives for Ph.D. scholars and faculty members engaged in
              research. Access to digital libraries, international journals,
              and conference sponsorships ensures global exposure.
            </p>

            <p>
              GEHU's official journal, *Paper Published in International Journals*,
              encourages publication in Scopus and SCI-indexed journals. More than
              1000 research papers and 50+ patents have been filed by faculty and
              students in the last five years. Faculty development programs,
              seminars on IPR, and entrepreneurship workshops are regularly held.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return "Sorry, not accessible";
  }
}

const Faculty = () => {
  return (
    <div>
      <HeaderComponent />
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Kome />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/patent" element={<Patent />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/prephd" element={<PrePhd />} />
        <Route path="/colloquium" element={<Colloqium />} />
        <Route path="/thesis" element={<Thesis />} />
        <Route path="/studyleave" element={<StudyLeave />} />
        <Route path="/tada" element={<Tada />} />
        <Route path="/update" element={<UserRegistration />} />
      </Routes>
      <FooterComponent />
    </div>
  );
};

export default Faculty;

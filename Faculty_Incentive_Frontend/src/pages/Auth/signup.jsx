import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import HeaderComponent from "../../Components/headerComponent";
import FooterComponent from "../../Components/footerComponent";

const SERVER = import.meta.env.VITE_SERVER;

function SignUp() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const clickHandler = async () => {
    const email = document.getElementById("form3Example3").value;
    const empId = document.getElementById("form3Example4").value;
    const password = document.getElementById("form3Example5").value;
    const Department = document.getElementById("Department").value;
    const Name = document.getElementById("Name").value;
    const Designation = document.getElementById("Designation").value;
    const Phone = document.getElementById("Phone").value;
    const Gender = document.getElementById("Gender").value;

    const newUser = {
      email,
      empId,
      password,
      Department,
      Name,
      Designation,
      Phone,
      Gender,
    };

    try {
      const response = await fetch(`${SERVER}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        console.log("Success");
        navigate("/"); // redirect on success
      } else {
        const data = await response.json();
        setMessage(data.message || "Registration failed");
        console.log("Error", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred"+ error.message);
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className="bodyClass">
        <form className="RegistrationForm">
          <div className="LoginElements">
            <h1>Register Page</h1>
            <br />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="Designation">Designation</label>
            <input
              type="text"
              id="Designation"
              placeholder="Enter your Designation"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="Department">Department</label>
            <input
              type="text"
              id="Department"
              placeholder="Enter your Department"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="Name">Name</label>
            <input type="text" id="Name" placeholder="Enter your Name" />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="Gender">Gender</label>
            <input type="text" id="Gender" placeholder="Enter your Gender" />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example3">Email address</label>
            <input
              type="email"
              id="form3Example3"
              placeholder="Enter a valid email address"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Employee Id</label>
            <input
              type="text"
              id="form3Example4"
              placeholder="Enter your Employee Id"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example5">Password</label>
            <input
              type="password"
              id="form3Example5"
              placeholder="Enter password"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="Phone">Phone Number</label>
            <input
              type="number"
              id="Phone"
              placeholder="Enter your Phone Number"
            />
          </div>
          <br />
          <div className="RegistrationElements">
            <button
              type="button"
              style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              onClick={clickHandler}
            >
              Register
            </button>
            <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
          </div>
          <div className="RegistrationElements">
            <p>
              Have an account? <a href="/">Sign In</a>
            </p>
          </div>
        </form>
      </div>
      <div className="footerClass">
        <FooterComponent />
      </div>
    </div>
  );
}

export default SignUp;

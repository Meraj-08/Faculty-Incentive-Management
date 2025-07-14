import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import HeaderComponent from "../../Components/headerComponent";
import FooterComponent from "../../Components/footerComponent";

const SERVER = import.meta.env.VITE_SERVER
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log(json)
      setUserData(json)
      setJwtToken(json.token);
      localStorage.setItem("userData", JSON.stringify(json))
      localStorage.setItem("jwtToken", json.token);

      if(json.empId === "cvrcsef002")
        navigate("/admin")
      else
        navigate("/faculty")
    } catch (error) {
      console.log(error)
      setMessage("Invalid Username or Password", error);
    }
  };

  return (
    <div>
      <HeaderComponent />
      <form className="LoginForm">
        <div className="LoginElements">
          <h1>Login</h1>
          <br />
        </div>
        <div className="LoginElements">
          <label htmlFor="form1Example13">Email address</label>
          <input
            type="email"
            id="form1Example13"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="LoginElements">
          <label htmlFor="form1Example23">Password</label>
          <input
            type="password"
            id="form1Example23"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ color: "red" }}>{message}</div>
        <br />
        <div className="LoginElements">
          <button type="submit" onClick={handleSubmit}>
            Sign in
          </button>
        </div>
        <div className="LoginElements">
          <p>OR</p>
        </div>
        <div className="LoginElements">
          <a href="/signup" role="button">
            <i></i>Register
          </a>
        </div>
        {jwtToken && (
          <div className="alert alert-success mt-3">JWT token: {jwtToken}</div>
        )}
      </form>
      <FooterComponent />
    </div>
  );
}

export default LogIn;

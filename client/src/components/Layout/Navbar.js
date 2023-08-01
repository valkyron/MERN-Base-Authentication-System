import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import '../../css/header.css';

const Navbar = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">  {/* style={{ backgroundColor: '#e3f2fd' }} */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Project Management</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="far fa-smile"></i>
                </a>
              </li> */}
              <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Projects
                  </button>
                  <div className="dropdown-menu" aria-labelledby="projectsDropdown">
                  <Link className="dropdown-item" to="/projectproposal">Form Submission</Link>
                    <Link className="dropdown-item" to="/">Saved Proposals</Link>
                    <Link className="dropdown-item" to="/submittedproposals">View Submitted Proposals</Link>
                  </div>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Quotations</Link>
              </li>
              <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Requests
                  </button>
                  <div className="dropdown-menu" aria-labelledby="projectsDropdown">
                  <Link className="dropdown-item" to="/">Request Sent</Link>
                    <Link className="dropdown-item" to="/">Submit Document</Link>
                    <Link className="dropdown-item" to="/">Request for Change of Institute after Release</Link>
                    <Link className="dropdown-item" to="/">Miscellaneous Request</Link>
                  </div>
            </li>
              <li className="nav-item">
                <p className="nav-link">
                  <i className="fas fa-user mx-1"></i>
                  Hi, {loginUser && loginUser.name}!</p>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projectproposal">
                <i className="fas fa-envelope mx-1"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-cog mx-1"></i>
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
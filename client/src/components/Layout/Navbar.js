import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import '../../css/header.css';
import axios from "axios";

const Navbar = () => {
  // const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  //   const ResponsiveLink = styled(Link) `
  //   /* Default font-size */
  //   font-size: 16px;

  //   @media (max-width: 858px) {
  //     /* Font size for smaller screens */
  //     font-size: 14px;
  //   }
  // `;

  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const handleNavCollapse = () => {
  //   setIsNavCollapsed(!isNavCollapsed);
  //   console.log("isNavCollapsed", isNavCollapsed);
  // };

  // const closeNav = () => {
  //   setIsNavCollapsed(true);
  // };

  const logoutHandler = () => {
    // setLoading(true);
    axios.post("/users/logout").then((response) => {
        localStorage.removeItem("user");
        message.success("Logged out successfully");
        navigate("/home");
    }).catch((error) => {
      console.log(error);
      message.error("Something went wrong");
    }).finally(() => {
      // setLoading(false);
    });

  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <nav>
        <input type="checkbox" id="check"/>
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
        {loginUser === "" && (
              <>
                <li> <Link className="nav-link" to="/">About Us</Link> </li>
                <li> <Link className="nav-link" to="/">Schemes</Link> </li>
                <li> <Link className="nav-link" to="/">Downloads</Link> </li>
                <li> <Link className="nav-link" to="/">Contact Us</Link> </li>
                <li> <Link className="nav-link" to="/">Announcements</Link> </li>
                <li> <Link className="nav-link" to="/login">Login</Link> </li>
                {/* <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Projects
                    </button>
                    <div className="dropdown-menu" aria-labelledby="projectsDropdown"> */}
                    {/* <div className={`dropdown-menu ${isNavCollapsed ? (isDropdownOpen ? 'show' : '') : ''}`} aria-labelledby="projectsDropdown"> */}
                    {/* <Link className="dropdown-item" to="/projectproposal">Form Submission</Link>
                      <Link className="dropdown-item" to="/">Saved Proposals</Link>
                      <Link className="dropdown-item" to="/submittedproposals">View Submitted Proposals</Link>
                    </div>
                </li> */}

              </>
              )}

        {loginUser.role === "pi" && (
              <>
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Projects
                    </button>
                    <div className="dropdown-menu" aria-labelledby="projectsDropdown">
                    {/* <div className={`dropdown-menu ${isNavCollapsed ? (isDropdownOpen ? 'show' : '') : ''}`} aria-labelledby="projectsDropdown"> */}
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
              </>
              )}
            </ul>
            {(loginUser.role === "pi" || loginUser.role === "cwdb") && ( 
            <div className="navright">
              <ul>
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
           )}
      </nav>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </>
  );
};

export default Navbar;
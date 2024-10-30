import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles.css";

function Header() {
  const location = useLocation();
  const navbarRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleLinkClick = () => {
    closeSidebar(); // Close sidebar when a link is clicked
  };

  useEffect(() => {
    // Handle scroll event to close the sidebar
    const handleScroll = () => {
      if (isSidebarVisible) {
        closeSidebar(); // Close sidebar on scroll
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Add click event listener for outside click
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeSidebar(); // Close sidebar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up scroll event listener
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener when the component unmounts
    };
  }, [isSidebarVisible]); // Include isSidebarVisible as a dependency

  return (
    <section className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <section className="container-fluid" ref={navbarRef}>
          <Link className="navbar-brand" to="/">
            Spark
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
            aria-controls="navbarNav"
            aria-expanded={isSidebarVisible}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <section
            className={`navbar-collapse ${isSidebarVisible ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dawrat"
                  className={`nav-link ${
                    location.pathname === "/dawrat" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  دوراتنا
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/examsScreen"
                  className={`nav-link ${
                    location.pathname === "/examsScreen" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  بجاريت
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/faqs"
                  className={`nav-link ${
                    location.pathname === "/faqs" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  عن المعهد
                </Link>
              </li>
            </ul>
          </section>
        </section>
      </nav>
    </section>
  );
}

export default Header;

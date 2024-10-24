import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';

function Header() {
  const location = useLocation();
  const navbarRef = useRef(null); // Ref to track the navbar collapse
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  // Function to handle toggler button click
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    closeSidebar();
  };
 
  useEffect(() => {
    // Add click event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" ref={navbarRef}>
          <Link className="navbar-brand" to="/">Spark</Link>
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
          <div className={`navbar-collapse ${isSidebarVisible ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={handleLinkClick}>
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dawrat" className={`nav-link ${location.pathname === '/dawrat' ? 'active' : ''}`} onClick={handleLinkClick}>
                  دوراتنا
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/examsScreen" className={`nav-link ${location.pathname === '/examsScreen' ? 'active' : ''}`} onClick={handleLinkClick}>
                  تمرّن
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faqs" className={`nav-link ${location.pathname === '/faqs' ? 'active' : ''}`} onClick={handleLinkClick}>
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={handleLinkClick}>
                  عن المعهد
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

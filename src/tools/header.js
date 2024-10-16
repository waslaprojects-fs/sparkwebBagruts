import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';

function Header() {
  const location = useLocation();
  const navbarRef = useRef(null); // Ref to track the navbar collapse

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      // Close the navbar collapse if clicking outside of it
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  // Function to close the navbar when a link is clicked
  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  useEffect(() => {
    // Add click event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" ref={navbarRef}>
          <Link className="navbar-brand" to="/">
            Spark
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={handleLinkClick} // Close sidebar on click
                >
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dawrat"
                  className={`nav-link ${location.pathname === '/dawrat' ? 'active' : ''}`}
                  onClick={handleLinkClick} // Close sidebar on click
                >
                  دوراتنا
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/examsScreen"
                  className={`nav-link ${location.pathname === '/examsScreen' ? 'active' : ''}`}
                  onClick={handleLinkClick} // Close sidebar on click
                >
                  تمرّن
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/faqs"
                  className={`nav-link ${location.pathname === '/faqs' ? 'active' : ''}`}
                  onClick={handleLinkClick} // Close sidebar on click
                >
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  onClick={handleLinkClick} // Close sidebar on click
                >
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
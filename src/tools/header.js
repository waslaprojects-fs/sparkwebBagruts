import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./header.css";
function Header() {
  // Get the current location path from React Router
  const location = useLocation();

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Brand
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
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dawrat"
                  className={`nav-link ${location.pathname === '/dawrat' ? 'active' : ''}`}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pricing"
                  className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
                >
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/faqs"
                  className={`nav-link ${location.pathname === '/faqs' ? 'active' : ''}`}
                >
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                >
                  About
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

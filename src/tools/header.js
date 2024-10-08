import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Header() {
  // Get the current location path from React Router
  const location = useLocation();

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
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
      </header>
    </div>
  );
}

export default Header;

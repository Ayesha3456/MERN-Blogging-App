import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import icon from "../src/blog.png";

const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <img src={icon} width={35} height={35} className="ax-nav" alt="icon" />
        <Link className="navbar-brand ax-nav" to="/">
          Blog Manager App
        </Link>

        <div
          className="collapse navbar-collapse ax-navbar"
          id="navbarTogglerDemo03"
        >
          <div className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-blog">
                  New Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ marginTop: '56px' }}> {/* Adjust based on navbar height */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

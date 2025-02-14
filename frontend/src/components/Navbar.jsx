import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">AdRide</div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/manage">Manage Users</Link>
        <Link to="/ads">New Ads</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
};

export default Navbar;

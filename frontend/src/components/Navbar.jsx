import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons from lucide-react

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">AdRide</div>
        
        {/* Menu Icon */}
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/manage" onClick={() => setMenuOpen(false)}>Manage Users</Link>
          <Link to="/ads" onClick={() => setMenuOpen(false)}>New Ads</Link>
          <Link to="/analytics" onClick={() => setMenuOpen(false)}>Analytics</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

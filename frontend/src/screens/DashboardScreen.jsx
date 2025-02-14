import React from "react";
// import "./styles.css";

const DashboardScreen = () => {
  return (
    <>
    <h1 className='text-center' style={{ color: 'black' }}>Welcome Back, Arwind Kumarswamy!</h1>
    <h3 className='text-center'>Here's a quick overview of your platform’s performance.</h3>
    <div className="dashboard-container">


      <div className="stats-grid">
        <div className="stat-box yellow">800 <br /> Active Users</div>
        <div className="stat-box pink">₹13,500 <br /> Total Earnings</div>
        <div className="stat-box light-yellow">25 <br /> Pending Approvals</div>
        </div>
        <div className="stats-grid1">
        <div className="stat-box1 red">250 <br /> Total Ads Approved</div>
        <div className="stat-box1 yellow">1.5K Users/week <br /> Platform Engagement</div>
      </div>
    </div>
    </>
  );
};

export default DashboardScreen;

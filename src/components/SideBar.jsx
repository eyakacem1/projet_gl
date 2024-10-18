import React from "react";

function SideBar() {
  return (
    <>
      <nav
        className="bg-light sidebar"
        style={{
          width: "300px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          transition: "transform 0.3s ease", 
        }}
      >
        <div className="sidebar-header p-3">
          <h4>Admin Panel</h4>
        </div>
        <ul className="list-unstyled components">
          <li className="p-2">
            <a href="#dashboard" className="text-decoration-none">Dashboard</a>
          </li>
          <li className="p-2">
            <a href="#clients" className="text-decoration-none">Manage Clients</a>
          </li>
          <li className="p-2">
            <a href="#demands" className="text-decoration-none">Manage Demands</a>
          </li>
          <li className="p-2">
            <a href="#reports" className="text-decoration-none">Reports</a>
          </li>
          <li className="p-2">
            <a href="#logout" className="text-decoration-none">Logout</a>
          </li>
        </ul>
      </nav>

     
      
    </>
  );
}

export default SideBar;

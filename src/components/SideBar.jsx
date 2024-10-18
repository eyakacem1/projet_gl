import React from "react";

function SideBar() {
  return (
    <>
      <nav className="bg-light sidebar" style={{ width: "350px", height: "100vh", position: "fixed", top: 0, // Make sure it sticks to the top
          left: 0, // Align it to the left
          }}>
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

import React, { useState } from "react";

function ClientForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add code here to send the form data to a server or API.
  };

  return (<>
      <div className="content" style={{ marginLeft: "250px", padding: "20px" }}>
    <h2> Add Client Form </h2>
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <textarea
          id="address"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Add</button>
    </form></div></>
  );
}

export default ClientForm;
import React from "react";
import { Link } from "react-router-dom";

const Client = ({ client }) => {
  return (
    <Link to={`/clients/${client.id}`} className="client__item">
      <div className="client__header">
        <div className="client__image">
          <img src={client.photoUrl} alt={client.name} />
        </div>
        <div className="client__details">
          <p className="client_name">{client.name.substring(0, 15)}</p>
        </div>
      </div>
      <div className="client__body">
        <p>
          <i className="bi bi-envelope"></i> {client.email.substring(0, 20)}
        </p>
        <p>
          <i className="bi bi-geo"></i> {client.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {client.phone}
        </p>
        <p>
          {client.status === "Active" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}{" "}
          {client.status}
        </p>
      </div>
    </Link>
  );
};

export default Client;

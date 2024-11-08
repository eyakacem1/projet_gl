import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, deleteClient } from '../../api/clientAPI';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClients();
      setClients(data);
    };
    loadClients();
  }, []);

  return (
    <div>
      <h2>Client List</h2>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.nom} - {client.adress} - {client.numtel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default ClientList;

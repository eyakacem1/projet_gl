import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';  
import Button from '@mui/material/Button';

export default function ClientList() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [clients, setClients] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:8088/client/getAllClients", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // CORS mode
    })
    .then(response => response.json())
    .then(data => setClients(data))  // Save data to state
    .catch(error => {
      console.error("Error:", error);  // Handle errors
    });
    
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Clients
      </Typography>

      {/* Form Paper */}
      <Paper elevation={3} style={paperStyle}>
        {/* Add any form fields or controls here */}
      </Paper>

      {/* Clients List */}
      {clients.length > 0 ? (
        clients.map((client) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={client.id}  // Make sure each client has a unique ID
          >
            <div>Nom: {client.nom}</div>
            <div>Adresse: {client.adresse}</div>
            <div>Numéro Téléphone: {client.numtel}</div>
          </Paper>
        ))
      ) : (
        <Typography>Aucun client trouvé</Typography>  // Message shown when no clients are found
      )}
    </Container>
  );
}

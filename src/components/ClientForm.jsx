import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ClientForm() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numtel, setNumtel] = useState('');
  const [clients, setClients] = useState(''); 
  const navigate = useNavigate();  
  const userRole = localStorage.getItem("userRole");

  const handleClick = (e) => {
    e.preventDefault(); 
    const client = { nom, adresse, numtel };
    console.log(client);

    fetch("http://localhost:8088/client/add", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(client)
    })
    .then(() => {
      console.log("New client added");
      navigate('/clients');  // Redirect to the client list page
    })
    .catch(error => {
      console.error("Error adding client:", error);
    });
  };

  useEffect(() => {
    fetch("http://localhost:8088/client/getAllClients")
      .then(res => res.json())
      .then((result) => {
        setClients(result); 
      })
  }, []); 
  
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter un Client
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="client-name" 
            label="Nom du client" 
            variant="outlined" 
            fullWidth 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
          />
          <TextField 
            id="client-address" 
            label="Adresse du client" 
            variant="outlined" 
            fullWidth 
            value={adresse} 
            onChange={(e) => setAdresse(e.target.value)} 
          />
          <TextField 
            id="client-phone" 
            label="Numéro téléphone du client" 
            variant="outlined" 
            fullWidth 
            value={numtel} 
            onChange={(e) => setNumtel(e.target.value)} 
          />
          <Button variant="contained" onClick={handleClick}>Ajouter</Button>
        </Box>
      </Paper>
    </Container>
  );
}

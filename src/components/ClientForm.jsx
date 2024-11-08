import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';  
import Button from '@mui/material/Button';

export default function ClientForm() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleClick = (e) => {
    e.preventDefault(); 
    const client = { name, address, telephone };
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
    })
    .catch(error => {
      console.error("Error adding client:", error);
    });
  };
  
  return (
    <Container>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter un Client
      </Typography>

      {/* Form Paper */}
      <Paper elevation={3} style={paperStyle}>
        {/* Form Declaration */}
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
          {/* Form Inputs */}
          <TextField 
            id="client-name" 
            label="Nom du client" 
            variant="outlined" 
            fullWidth 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <TextField 
            id="client-address" 
            label="Adresse du client" 
            variant="outlined" 
            fullWidth 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
          <TextField 
            id="client-phone" 
            label="Numéro téléphone du client" 
            variant="outlined" 
            fullWidth 
            value={telephone} 
            onChange={(e) => setTelephone(e.target.value)} 
          />
          <Button variant="contained" onClick={handleClick}>Ajouter</Button>
        </Box>
      </Paper>
    </Container>
  );
}

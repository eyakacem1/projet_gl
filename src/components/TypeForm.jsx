import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function TypeForm() {
  const [tarifH, setTarifH] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '600px' };

  const handleSubmit = (e) => {
    e.preventDefault();
    const typePiece = { tarifH, type };

    console.log(typePiece);

    fetch("http://localhost:8088/type/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typePiece),
    })
      .then(() => {
        console.log("New TypePiece added");
        navigate('/Materiels/Types');
      })
      .catch(error => console.error("Error adding TypePiece:", error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter un Type de Pièce
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="typePiece-tarifH"
            label="Tarif Horaire"
            variant="outlined"
            fullWidth
            value={tarifH}
            onChange={(e) => setTarifH(e.target.value)}
          />

          <TextField
            id="typePiece-type"
            label="Type de Pièce"
            variant="outlined"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

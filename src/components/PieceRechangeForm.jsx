import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

export default function PieceRechangeForm() {
  const [nom, setNom] = useState(''); 
  const [prixAchat, setPrixAchat] = useState('');
  const [prixHT, setPrixHT] = useState('');
  const [prixTTC, setPrixTTC] = useState('');
  const [quantite, setQuantite] = useState('');

  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };

  const handleClick = (e) => {
    e.preventDefault(); 
    const pieceRechange = { 
      nom, 
      prixAchat, 
      prixHT, 
      prixTTC,
      quantite
    };

    console.log(pieceRechange);

    // Send the data to the Spring Boot backend
    fetch("http://localhost:8080/api/piece-rechange", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pieceRechange)
    })
    .then(response => {
      if (response.ok) {
        console.log("Nouvelle pièce rechange ajoutée");
        alert("Nouvelle pièce ajoutée avec succès !");
      } else {
        console.error("Erreur lors de l'ajout de la pièce rechange");
        alert("Erreur lors de l'ajout de la pièce !");
      }
    })
    .catch(error => {
      console.error("Erreur de connexion :", error);
      alert("Erreur de connexion avec le serveur !");
    });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter une Pièce Rechange
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="piece-nom"
            label="Nom de la Pièce"
            variant="outlined"
            fullWidth
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          <TextField
            id="piece-prix-achat"
            label="Prix d'Achat"
            variant="outlined"
            fullWidth
            value={prixAchat}
            onChange={(e) => setPrixAchat(e.target.value)}
          />

          <TextField
            id="piece-prix-ht"
            label="Prix HT"
            variant="outlined"
            fullWidth
            value={prixHT}
            onChange={(e) => setPrixHT(e.target.value)}
          />

          <TextField
            id="piece-prix-ttc"
            label="Prix TTC"
            variant="outlined"
            fullWidth
            value={prixTTC}
            onChange={(e) => setPrixTTC(e.target.value)}
          />

          <TextField
            id="piece-quantite"
            label="Quantité"
            variant="outlined"
            fullWidth
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
          />

          <Button 
            variant="contained" 
            onClick={handleClick}
          >
            Ajouter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material';

export default function PieceRechangeEdit() {
  const { id } = useParams();  
  const navigate = useNavigate();
  
  const [piece, setPiece] = useState({
    nom: '',
    prixAchat: '',
    prixHT: '',
    prixTTC: '',
    quantite: '',
  });

  useEffect(() => {
    // Fetch the current piece data
    fetch(`http://localhost:8080/api/piece-rechange/${id}`)
      .then(response => response.json())
      .then(data => setPiece(data))
      .catch(error => console.error('Erreur lors de la récupération de la pièce:', error));
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setPiece({ ...piece, [name]: value });
  };
  
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to backend
    fetch(`http://localhost:8080/api/piece-rechange/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(piece),
    })
      .then(() => {
        console.log("Pièce mise à jour avec succès");
        navigate('/');  
      })
      .catch(error => console.error("Erreur lors de la mise à jour de la pièce:", error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Modifier la Pièce Rechange
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="piece-nom"
            label="Nom de la Pièce"
            variant="outlined"
            fullWidth
            name="nom"
            value={piece.nom}
            onChange={handleChange}
          />

          <TextField
            id="piece-prix-achat"
            label="Prix d'Achat"
            variant="outlined"
            fullWidth
            name="prixAchat"
            value={piece.prixAchat}
            onChange={handleChange}
          />

          <TextField
            id="piece-prix-ht"
            label="Prix HT"
            variant="outlined"
            fullWidth
            name="prixHT"
            value={piece.prixHT}
            onChange={handleChange}
          />

          <TextField
            id="piece-prix-ttc"
            label="Prix TTC"
            variant="outlined"
            fullWidth
            name="prixTTC"
            value={piece.prixTTC}
            onChange={handleChange}
          />

          <TextField
            id="piece-quantite"
            label="Quantité"
            variant="outlined"
            fullWidth
            name="quantite"
            value={piece.quantite}
            onChange={handleChange}
          />

          <Button variant="contained" color="primary" type="submit">
            Mettre à jour
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

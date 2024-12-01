import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function ReparationForm() {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all demandes
    fetch("http://localhost:8088/demande/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setDemandes(data);
    })
    .catch(error => console.error("Erreur:", error));
  }, []);

  const handleCreateReparationClick = (demandeId) => {
    navigate(`/ReparationCreate/${demandeId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Demandes - Créer une Réparation
      </Typography>

      {demandes.length > 0 ? (
        demandes.map((demande, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={demande.id || index}
          >
            <div>Numéro Série: {demande.numSerie}</div>
            <div>Symptômes: {demande.symptomes}</div>

            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleCreateReparationClick(demande.id)}
            >
              Créer une Réparation
            </Button>
          </Paper>
        ))
      ) : (
        <Typography>Aucune demande trouvée</Typography>
      )}
    </Container>
  );
}

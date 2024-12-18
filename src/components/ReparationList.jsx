import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from './AuthContext';  

export default function ReparationList() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [reparations, setReparations] = useState([]);
  const [demandesNonTraitees, setDemandesNonTraitees] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddReparationClick = (demandeId) => {
    navigate(`/ReparationCreate/${demandeId}`); 
  };

  useEffect(() => {
    fetch("http://localhost:8088/Reparation/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setReparations(data);
    })
    .catch(error => console.error("Erreur:", error));

    fetch("http://localhost:8088/demande/getNonTraitee", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setDemandesNonTraitees(data);
    })
    .catch(error => console.error("Erreur:", error));

  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Demandes Non Traitées
      </Typography>

      {demandesNonTraitees.length > 0 ? (
        demandesNonTraitees.map((demande, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={demande.id || index}
          >
            <div>Client: {demande.clientNom}</div>
            <div>Date: {new Date(demande.date).toLocaleDateString()}</div>
            <div>Description: {demande.description}</div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddReparationClick(demande.id)} 
              style={{ marginTop: '10px' }}
            >
              Ajouter une réparation pour cette demande
            </Button>
          </Paper>
        ))
      ) : (
        <Typography>Aucune demande non traitée trouvée</Typography>
      )}

      <Typography variant="h4" component="h1" gutterBottom align="center" style={{ marginTop: '40px' }}>
        Liste des Réparations
      </Typography>

      {reparations.length > 0 ? (
        reparations.map((reparation, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={reparation.id || index}
          >
            <div>Description: {reparation.description}</div>
            <div>Date Début: {new Date(reparation.dateDebut).toLocaleDateString()}</div>
            <div>Date Fin: {new Date(reparation.dateFin).toLocaleDateString()}</div>
            <div>Demande ID: {reparation.demande ? reparation.demande.id : 'Non spécifié'}</div>
            <Link to={`/ReparationEdit/${reparation.id}`}>
              <Button 
                variant="outlined" 
                color="primary"
                startIcon={<EditIcon />}
              >
                Modifier
              </Button>
            </Link>
          </Paper>
        ))
      ) : (
        <Typography>Aucune réparation trouvée</Typography>
      )}
    </Container>
  );
}

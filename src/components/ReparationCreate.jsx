import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';

export default function ReparationCreate() {
  const { demandeId } = useParams(); // Get the demandeId from the URL params
  const [commentaires, setCommentaires] = useState('');
  const [dureeReparation, setDureeReparation] = useState('');
  const [piecesConsommees, setPiecesConsommees] = useState([]); // Store selected pieces
  const [allPieces, setAllPieces] = useState([]); // Store all available pieces
  const navigate = useNavigate();

  // Fetch all available pieces de rechange from the backend
  useEffect(() => {
    fetch("http://localhost:8088/pieces/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setAllPieces(data); // Ensure that data is an array
      } else {
        console.error('Invalid data format:', data);
        setAllPieces([]); // Set empty array if the data is not valid
      }
    })
    .catch(error => {
      console.error("Erreur:", error);
      alert('Erreur lors du chargement des pièces de rechange');
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the reparation data
    const reparationData = {
      demandeId,
      commentaires,
      dureeReparation,
      piecesConsommees, // Sending the selected pieces as an array
    };

    // Send the data to the backend (create a reparation)
    fetch("http://localhost:8088/reparation/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reparationData),
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      alert('Réparation créée avec succès!');
      navigate('/reparationList'); // Redirect to the reparation list after creation
    })
    .catch(error => {
      console.error("Erreur:", error);
      alert('Erreur lors de la création de la réparation');
    });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Créer une Réparation pour Demande {demandeId}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Commentaires"
          variant="outlined"
          fullWidth
          value={commentaires}
          onChange={(e) => setCommentaires(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Durée de la Réparation"
          variant="outlined"
          fullWidth
          value={dureeReparation}
          onChange={(e) => setDureeReparation(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        {/* Multi-Select for Pièces Consommées */}
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Pièces Consommées</InputLabel>
          <Select
            label="Pièces Consommées"
            multiple
            value={piecesConsommees}
            onChange={(e) => setPiecesConsommees(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {Array.isArray(allPieces) && allPieces.length > 0 ? (
              allPieces.map((piece) => (
                <MenuItem key={piece.id} value={piece.id}>
                  <Checkbox checked={piecesConsommees.indexOf(piece.id) > -1} />
                  <ListItemText primary={piece.nom} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucune pièce disponible</MenuItem>
            )}
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Créer Réparation
        </Button>
      </form>
    </Container>
  );
}

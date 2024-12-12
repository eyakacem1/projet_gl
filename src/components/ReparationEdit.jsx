import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, Chip, InputAdornment } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReparationUpdate() {
  const [piecesConsommees, setPiecesConsommees] = useState([]); // Store selected pieces with quantities
  const [allPieces, setAllPieces] = useState([]); // Store all available pieces
  const [commentaires, setCommentaires] = useState('');
  const [dureeReparation, setDureeReparation] = useState('');
  const [dateDebutReparation, setDateDebutReparation] = useState('');
  const [dateFinReparation, setDateFinReparation] = useState('');
  const [description, setDescription] = useState('');
  const [tempsMO, setTempsMO] = useState('');
  const [tarifHMO, setTarifHMO] = useState('');
  const { demandeId, reparationId } = useParams(); // Get reparationId from params
  const navigate = useNavigate(); // To navigate after the update

  const formatDate = (date) => {
    return new Date(date).toISOString(); // Ensure it's in ISO format
  };

  // Fetch all pieces from the backend
  useEffect(() => {
    fetch("http://localhost:8088/piece/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllPieces(data); 
        } else {
          console.error('Invalid data format:', data);
          setAllPieces([]); 
        }
      })
      .catch(error => {
        console.error("Erreur:", error);
        alert('Erreur lors du chargement des pièces de rechange');
      });
  }, []);

  // Fetch existing reparation data for update
  useEffect(() => {
    fetch(`http://localhost:8088/Reparation/${reparationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setDescription(data.description);
          setDateDebutReparation(data.dateDebutReparation);
          setDateFinReparation(data.dateFinReparation);
          setTempsMO(data.tempsMO);
          setTarifHMO(data.tarifHMO);
          setPiecesConsommees(data.reparationPieces || []);
        } else {
          console.error('Reparation not found');
          alert('Reparation not found');
        }
      })
      .catch(error => {
        console.error("Erreur:", error);
        alert('Erreur lors du chargement des informations de réparation');
      });
  }, [reparationId]);

  // Handle piece quantity change
  const handleQuantityChange = (pieceId, quantity) => {
    setPiecesConsommees(prevPieces => 
      prevPieces.map(piece => 
        piece.pieceRechange.id === pieceId ? { ...piece, qte: parseInt(quantity, 10) || 1 } : piece
      )
    );
  };

  // Add or update a piece with quantity
  const handleAddPiece = (pieceId) => {
    const existingPiece = piecesConsommees.find(piece => piece.pieceRechange.id === pieceId);
    if (!existingPiece) {
      const piece = allPieces.find(p => p.id === pieceId);
      if (piece) {
        setPiecesConsommees(prevPieces => [
          ...prevPieces,
          { pieceRechange: { id: pieceId, nom: piece.nom }, qte: 1 }
        ]);
      }
    }
  };

  // Remove piece from the selection
  const handleRemovePiece = (pieceId) => {
    setPiecesConsommees(piecesConsommees.filter(piece => piece.pieceRechange.id !== pieceId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the reparationData object with the correct structure
    const reparationData = {
      description,
      dateDebutReparation: formatDate(dateDebutReparation),
      dateFinReparation: formatDate(dateFinReparation),
      tempsMO,
      tarifHMO,
      demande: { id: demandeId },
      reparationPieces: piecesConsommees.map(piece => ({
        pieceRechange: { id: piece.pieceRechange.id },
        qte: piece.qte,
      })),
    };
    console.log('Reparation Data:', reparationData);

    fetch(`http://localhost:8088/Reparation/update/${reparationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reparationData),
      mode: 'cors',
    })
      .then(response => response.json())
      .then((data) => {
        console.log('Success:', data);
        navigate(`/Reparations`); // Redirect after successful update
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error processing your request.');
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Mettre à jour la Réparation
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Date and Time Inputs for Start and End Dates */}
        <TextField
          label="Date Début de Réparation"
          variant="outlined"
          fullWidth
          type="datetime-local"
          value={dateDebutReparation}
          onChange={(e) => setDateDebutReparation(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Date Fin de Réparation"
          variant="outlined"
          fullWidth
          type="datetime-local"
          value={dateFinReparation}
          onChange={(e) => setDateFinReparation(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Description, Temps MO and Tarif HMO */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Temps MO (en heures)"
          variant="outlined"
          fullWidth
          value={tempsMO}
          onChange={(e) => setTempsMO(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Tarif HMO"
          variant="outlined"
          fullWidth
          value={tarifHMO}
          onChange={(e) => setTarifHMO(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        {/* Select component for pièces consommées */}
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Pièces Consommées</InputLabel>
          <Select
            label="Pièces Consommées"
            multiple
            value={piecesConsommees.map(piece => piece.pieceRechange.id)} // Selected piece IDs
            onChange={(e) => {
              const selectedIds = e.target.value;
              selectedIds.forEach(id => handleAddPiece(id));
            }}
            renderValue={(selected) => 
              selected
                .map((id) => {
                  const selectedPiece = allPieces.find((piece) => piece.id === id);
                  return selectedPiece ? selectedPiece.nom : id;
                })
                .join(', ') // Display selected piece names
            }
          >
            {Array.isArray(allPieces) && allPieces.length > 0 ? (
              allPieces.map((piece) => (
                <MenuItem key={piece.id} value={piece.id}>
                  <Checkbox checked={piecesConsommees.some(piece => piece.pieceRechange.id === piece.id)} />
                  <ListItemText primary={piece.nom} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Aucune pièce disponible</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Display selected pieces as Chips with quantity input */}
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6">Pièces sélectionnées:</Typography>
          {piecesConsommees.length === 0 ? (
            <Typography>No pieces selected.</Typography>
          ) : (
            piecesConsommees.map((piece, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Chip
                  label={`${piece.pieceRechange.nom} (x${piece.qte})`} 
                  onDelete={() => handleRemovePiece(piece.pieceRechange.id)}
                  style={{ marginRight: '8px' }}
                />
                <TextField
                  label="Quantité"
                  type="number"
                  value={piece.qte}
                  onChange={(e) => handleQuantityChange(piece.pieceRechange.id, e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">x</InputAdornment>,
                  }}
                  style={{ width: '80px' }}
                />
              </div>
            ))
          )}
        </div>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Mettre à jour la Réparation
        </Button>
      </form>
    </Container>
  );
}

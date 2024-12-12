import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const FactureList = () => {
  const [reparations, setReparations] = useState([]);
  const [factures, setFactures] = useState([]);

  // Fetch Reparations without Factures
  const loadReparationsWithoutFactures = () => {
    fetch('http://localhost:8088/Reparation/noFacture')
      .then((response) => response.json())
      .then((data) => {
        setReparations(data);
      })
      .catch((error) => console.error('Error fetching reparations:', error));
  };

  // Fetch Existing Factures
  const loadFactures = () => {
    fetch('http://localhost:8088/facture/all')
      .then((response) => response.json())
      .then((data) => {
        // Ensure factures is always an array
        setFactures(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error('Error fetching factures:', error));
  };

  // Create Facture for a given Reparation
  const createFacture = (reparationId) => {
    fetch(`http://localhost:8088/facture/add/${reparationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "reparationId": reparationId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Facture created successfully!');
          // Update the state to reflect the newly created facture
          setReparations(reparations.filter((reparation) => reparation.id !== reparationId));
          loadFactures(); // Optionally optimize to add the new facture directly
        } else {
          console.error('Failed to create facture.');
        }
      })
      .catch((error) => console.error('Error creating facture:', error));
  };

  // Load data when the component mounts
  useEffect(() => {
    loadReparationsWithoutFactures();
    loadFactures();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Liste des reparations non facturées
      </Typography>
      {reparations.length === 0 ? (
        <Typography>aucune reparations non facturée</Typography>
      ) : (
        <List>
          {reparations.map((reparation) => (
            <ListItem key={reparation.id} divider>
              <ListItemText
                primary={`Reparation ID: ${reparation.id}`}
                secondary={`Description: ${reparation.description}`}
                
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => createFacture(reparation.id)}
                disabled={
                  factures.length > 0 && factures.some((facture) => facture.reparation.id === reparation.id)
                } // Disable if facture exists
              >
                Enregistrer
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Liste des factures
      </Typography>
      <List>
  {factures.map((facture) => (
    <ListItem key={facture.numeroFacture} divider>
      <ListItemText
        primary={`Facture ID: ${facture.numeroFacture}`}
        secondary={`Nom Client: ${facture.reparation.demande.client.nom}, Montant: ${facture.montant}`}
      />
      <ListItemText
        secondary={`Date d'émission: ${new Date(facture.dateEmission).toLocaleDateString()}`} // Format the date
      />
    </ListItem>
  ))}
</List>

    </Paper>
  );
};

export default FactureList;

import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useParams, useNavigate } from 'react-router-dom';

export default function DemandeEdit() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [demande, setDemande] = useState(null);  
  const [clients, setClients] = useState([]);
  const [etats, setEtats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modele, setModele] = useState(''); 
  const [marque, setMarque] = useState(''); 
  const [symptomesPanne, setSymptomesPanne] = useState(''); 
  const [numSerie, setNumSerie] = useState('');
  const [etat, setEtat] = useState('CREE'); 
  const [idClient, setIdClient] = useState('');
  const [datePrevueRep, setDatePrevueRep] = useState('');
  const [dateDepotAppareil, setDateDepotAppareil] = useState('');

  useEffect(() => {
    fetch('http://localhost:8088/client/getAllClients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));

    fetch('http://localhost:8088/demande/etats')
      .then(response => response.json())
      .then(data => setEtats(data))
      .catch(error => console.error('Error fetching etats:', error));

    if (id) {
      fetch(`http://localhost:8088/demande/${id}`)
        .then(response => response.json())
        .then(data => {
          setDemande(data);
          setModele(data.modele);
          setMarque(data.marque);
          setSymptomesPanne(data.symptomesPanne);
          setNumSerie(data.numSerie);
          setEtat(data.etat);
          setIdClient(data.client.id);
          setDatePrevueRep(data.datePrevueRep);
          setDateDepotAppareil(data.dateDepotAppareil);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching demande:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSave = () => {
    const updatedDemande = {
      dateDepotAppareil,
      datePrevueRep,
      etat,
      symptomesPanne,
      numSerie,
      marque,
      modele,
      client: {
        id: idClient,
      },
    };

    fetch(`http://localhost:8088/demande/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDemande),
    })
      .then(() => navigate('/demandes'))
      .catch(error => console.error('Error updating demande:', error));
  };

  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Modifier une Demande
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '1000px' }}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
          <Autocomplete
            id="demande-client"
            value={clients.find(client => client.id === idClient) || null}
            onChange={(event, newValue) => setIdClient(newValue ? newValue.id : '')}
            options={clients}
            getOptionLabel={(option) => `${option.nom} - ${option.telephone} - ${option.adresse}`}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            renderInput={(params) => (
              <TextField {...params} label="Nom du Client" variant="outlined" fullWidth helperText="Sélectionnez un client" />
            )}
          />

          <TextField
            label="Date de Dépôt"
            type="date"
            value={dateDepotAppareil}
            onChange={(e) => setDateDepotAppareil(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <TextField
            label="Date Prévue de Réparation"
            type="date"
            value={datePrevueRep}
            onChange={(e) => setDatePrevueRep(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel id="etat-label">État</InputLabel>
            <Select
              labelId="etat-label"
              id="etat"
              value={etat}
              onChange={(event) => setEtat(event.target.value)}
              label="État"
            >
              <MenuItem value="CREE">Crée</MenuItem>
              <MenuItem value="TERMINEE">Terminée</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Numéro Série"
            value={numSerie}
            onChange={(e) => setNumSerie(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <TextField
            label="Modèle"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <TextField
            label="Marque"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <TextField
            label="Symptômes"
            value={symptomesPanne}
            onChange={(e) => setSymptomesPanne(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <Button variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

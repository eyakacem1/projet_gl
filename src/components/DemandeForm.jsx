import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';  
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
export default function DemandeForm() {
  const [modele, setModele] = useState(''); 
  const [marque, setMarque] = useState(''); 
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [symptomesPanne, setSymptomesPanne] = useState(''); 
    const [numSerie, setNumSerie] = useState('');
  const [etat, setEtat] = useState('CREE'); 
  const [idClient, setIdClient] = useState('');
  
const [datePrevueRep, setdatePrevueRep] = useState(''); 
  const [clients, setClients] = useState([]);
  const [etats, setEtats] = useState([]); 
  const navigate = useNavigate();
  const [dateDepotAppareil, setdateDepotAppareil] = useState('');

  useEffect(() => {
    fetch('http://localhost:8088/client/getAllClients') 
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8088/demande/etats') 
      .then(response => response.json())
      .then(data => setEtats(data))  
      .catch(error => console.error('Error fetching etats:', error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault(); 
    const demande = { 
      dateDepotAppareil,
      datePrevueRep ,
      etat, 
      symptomesPanne, 
      numSerie, 
      marque ,
      modele, 
      client: {
        id: idClient
      }
    };
    console.log(demande);

    fetch("http://localhost:8088/demande/add", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(demande)
    })
    .then(() => {
      console.log("Nouvelle demande ajoutée");
      navigate('/demandes');  
    })
    .catch(error => console.error("Erreur lors de l'ajout de la demande:", error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter une Demande
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
     <Autocomplete
  id="demande-client"
  value={idClient ? clients.find(client => client.id === idClient) : null}
  onChange={(event, newValue) => setIdClient(newValue ? newValue.id : '')}
  options={clients}
  getOptionLabel={(option) => `${option.nom} - ${option.telephone} - ${option.adresse}`}
  isOptionEqualToValue={(option, value) => option.id === value?.id}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Nom du Client"
      variant="outlined"
      fullWidth
      helperText="Sélectionnez un client"
    />
  
  )}
/><TextField
        label="Date de Dépôt"
        type="date"
        value={dateDepotAppareil}
        onChange={(e) => setdateDepotAppareil(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        fullWidth
        style={{ marginBottom: '20px' }}
      />

<TextField 
            id="demande-datePrevueRep" 
            label="Date Prévue de Réparation" 
            type="date"
            variant="outlined" 
            fullWidth 
            InputLabelProps={{
              shrink: true, 
            }}
            value={datePrevueRep} 
            onChange={(e) => setdatePrevueRep(e.target.value)} 
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
            id="demande-numSerie" 
            label="Numéro Série" 
            variant="outlined" 
            fullWidth 
            value={numSerie} 
            onChange={(e) => setNumSerie(e.target.value)} 
          /><TextField
          id="demande-modele"
          label="Modèle"
          variant="outlined"
          fullWidth
          value={modele}
          onChange={(e) => setModele(e.target.value)} 
        /><TextField
        id="demande-marque"
        label="Marque"
        variant="outlined"
        fullWidth
        value={marque}
        onChange={(e) => setMarque(e.target.value)} 
      />
          
          <TextField 
            id="demande-symptomesPanne" 
            label="Symptômes" 
            variant="outlined" 
            fullWidth 
            value={symptomesPanne} 
            onChange={(e) => setSymptomesPanne(e.target.value)} 
          />
           
            
          {/*<FormControl fullWidth>
            <InputLabel id="etat-label">État</InputLabel>
            <Select
              labelId="etat-label"
              id="demande-etat"
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
              label="État"
            >
              {etats.map((etat, index) => (
                <MenuItem key={index} value={etat}>{etat}</MenuItem>
              ))}
            </Select>
          </FormControl>*/}

          
         

          


<Button 
  variant="contained" 
  onClick={handleClick} >
  Ajouter
</Button>
        </Box>
      </Paper>
    </Container>
  );
}

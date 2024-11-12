import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

export default function DemandeList() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [demandes, setDemandes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const navigate = useNavigate();

  const handleAddDemandeClick = () => {
    navigate('/demandeForm');
  };

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

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
      setFilteredDemandes(data);
    })
    .catch(error => console.error("Erreur:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    const filtered = demandes.filter((demande) =>
      (demande.symptomes && demande.symptomes.toLowerCase().includes(query)) || 
      (demande.numSerie && demande.numSerie.toLowerCase().includes(query)) || 
      (demande.nomClient && demande.nomClient.toLowerCase().includes(query))
    );

    setFilteredDemandes(filtered);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setFilteredDemandes(demandes);
      return;
    }

    fetch(`http://localhost:8088/demande/search?query=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setFilteredDemandes(data);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Demandes
      </Typography>
      <div>
        <TextField
          label="Rechercher une demande"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearchClick}
          style={{ marginBottom: '20px' }}
        >
          Rechercher
        </Button>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDemandeClick}
        style={{ marginBottom: '20px' }}
      >
        Ajouter une nouvelle demande
      </Button>

      {filteredDemandes.length > 0 ? (
        filteredDemandes.map((demande, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={demande.id || index}
          >
            <div>Numéro Série: {demande.numSerie}</div>
            <div>Nom du Client: {demande.nomClient}</div>
            <Link to={`/editDemande/${demande.id}`}>
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
        <Typography>Aucune demande trouvée</Typography>
      )}
    </Container>
  );
}

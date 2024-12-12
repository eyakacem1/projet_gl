import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useAuth } from './AuthContext';  

export default function ClientList() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddClientClick = () => {
    navigate('/clientForm');
  };

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    fetch("http://localhost:8088/client/getAllClients", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setClients(data);
      setFilteredClients(data);
    })
    .catch(error => console.error("Erreur:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    const filtered = clients.filter((client) =>
      (client.nom && client.nom.toLowerCase().includes(query)) || 
      (client.adresse && client.adresse.toLowerCase().includes(query)) || 
      (client.numtel && client.numtel.toLowerCase().includes(query))
    );

    setFilteredClients(filtered);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setFilteredClients(clients);
      return;
    }

    fetch(`http://localhost:8088/client/search?query=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setFilteredClients(data);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Clients
      </Typography>
    <div>
      <TextField
        label="Rechercher un client"
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
      </Button></div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClientClick}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un nouveau client
      </Button>

      {filteredClients.length > 0 ? (
        filteredClients.map((client) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={client.id}
          >
            <div>Nom: {client.nom}</div>
            <div>Adresse: {client.adresse}</div>
            <div>Numéro Téléphone: {client.numtel}</div>
            <Link to={`/edit/${client.id}`}>
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
        <Typography>Aucun client trouvé</Typography>
      )}
    </Container>
  );
}

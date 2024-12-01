import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

export default function TypeList() {
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [typePieces, setTypePieces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTypePieces, setFilteredTypePieces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    fetch("http://localhost:8088/type/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setTypePieces(data);
      setFilteredTypePieces(data);
    })
    .catch(error => console.error("Erreur:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    // Filter only by 'type'
    const filtered = typePieces.filter((typePiece) =>
      typePiece.type && typePiece.type.toLowerCase().includes(query)
    );

    setFilteredTypePieces(filtered);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setFilteredTypePieces(typePieces);
      return;
    }

    // Only searching by 'type'
    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) {
      queryParams.append('query', searchQuery);
    }

    fetch(`http://localhost:8088/type/search?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setFilteredTypePieces(data);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleAddTypePieceClick = () => {
    navigate('/typeForm'); 
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Types de Pièces
      </Typography>
      <div>
        <TextField
          label="Rechercher un type de pièce"
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
        onClick={handleAddTypePieceClick}
        style={{ marginBottom: '20px' }}
      >
        Ajouter un nouveau type de pièce
      </Button>

      {filteredTypePieces.length > 0 ? (
        filteredTypePieces.map((typePiece, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={typePiece.id || index}
          >
            <div>Type: {typePiece.type}</div>
            <div>Tarif Horaire: {typePiece.tarifH} €</div>
            <Link to={`/typeEdit/${typePiece.id}`}>
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
        <Typography>Aucun type de pièce trouvé</Typography>
      )}
    </Container>
  );
}

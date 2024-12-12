import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useAuth } from './AuthContext';  

export default function PieceRechangeList() {
  const { user } = useAuth();
  const navigate = useNavigate();

  
  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const [pieces, setPieces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPieces, setFilteredPieces] = useState([]);

  const handleAddPieceClick = () => {
    navigate('/PieceForm');  
  };

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    fetch("http://localhost:8088/piece/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        setPieces(data);
        setFilteredPieces(data);  
      })
      .catch(error => console.error("Erreur:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    const filtered = pieces.filter((piece) =>
      (piece.nom && piece.nom.toLowerCase().includes(query)) || 
      (piece.prixAchat && piece.prixAchat.toString().includes(query))
    );

    setFilteredPieces(filtered);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setFilteredPieces(pieces);
      return;
    }

    fetch(`http://localhost:8080/api/piece-rechange/search?query=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        setFilteredPieces(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Liste des Pièces de Rechange
      </Typography>
      
      <TextField
        label="Rechercher une pièce de rechange"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearchClick}
        style={{ marginBottom: '20px' }}
      >
        Rechercher
      </Button>

      </div>      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPieceClick}
        style={{ marginBottom: '20px' }}
      >
        Ajouter une nouvelle pièce de rechange
      </Button>

      {filteredPieces.length > 0 ? (
        filteredPieces.map((piece, index) => (
          <Paper 
            elevation={6} 
            style={{ margin: "10px", padding: "15px", textAlign: "left" }} 
            key={piece.id || index}
          >
            <div>Nom: {piece.nom}</div>
            <div>Prix Achat: {piece.prixAchat} €</div>
            <div>Prix HT: {piece.prixHT} €</div>
            <div>Prix TTC: {piece.prixTTC} €</div>
            <Link to={`/edit-piece/${piece.id}`}>
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
        <Typography>Aucune pièce de rechange trouvée</Typography>
      )}
    </Container>
  );
}

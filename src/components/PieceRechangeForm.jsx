import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, MenuItem, Select, InputLabel, FormControl, Button, FormHelperText, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PieceRechangeForm() {
  const [nom, setNom] = useState('');
  const [code, setCode] = useState('');
  const [prixAchat, setPrixAchat] = useState('');
  const [prixHT, setPrixHT] = useState('');
  const [prixTTC, setPrixTTC] = useState('');
  const [typePiece, setTypePiece] = useState('');
  const [typePieces, setTypePieces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: '1000px' };
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!nom) formErrors.nom = 'Nom de la pièce est requis';
    if (!code) formErrors.code = 'Code de la pièce est requis';
    if (!prixAchat || isNaN(parseFloat(prixAchat))) formErrors.prixAchat = 'Prix d\'achat valide est requis';
    if (!prixHT || isNaN(parseFloat(prixHT))) formErrors.prixHT = 'Prix HT valide est requis';
    if (!prixTTC || isNaN(parseFloat(prixTTC))) formErrors.prixTTC = 'Prix TTC valide est requis';
    if (!typePiece) formErrors.typePiece = 'Sélectionnez un type de pièce';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const pieceRechange = {
      code,
      nom,
      prixAchat: parseFloat(prixAchat),
      prixHT: parseFloat(prixHT),
      prixTTC: parseFloat(prixTTC),
      typePiece: {
        id: typePiece 
      }
    };
    console.log(pieceRechange);
    fetch("http://localhost:8088/piece/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pieceRechange)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message || "Erreur serveur"); });
        }
        return response.json();
      })
      .then(() => {
        console.log("New Piece added");
        navigate('/Materiels/Pieces');
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout:", error);
        alert("Erreur lors de l'ajout de la pièce: " + error.message);
      });
  };

  const resetForm = () => {
    setNom('');
    setCode('');
    setPrixAchat('');
    setPrixHT('');
    setPrixTTC('');
    setTypePiece('');
    setErrors({});
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Ajouter une Pièce Rechange
      </Typography>

      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="piece-nom"
            label="Nom de la Pièce"
            variant="outlined"
            fullWidth
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            error={!!errors.nom}
            helperText={errors.nom}
          />

          <TextField
            id="piece-code"
            label="Code de la Pièce"
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={!!errors.code}
            helperText={errors.code}
          />

          <TextField
            id="piece-prix-achat"
            label="Prix d'Achat"
            variant="outlined"
            fullWidth
            value={prixAchat}
            onChange={(e) => setPrixAchat(e.target.value)}
            error={!!errors.prixAchat}
            helperText={errors.prixAchat}
          />

          <TextField
            id="piece-prix-ht"
            label="Prix HT"
            variant="outlined"
            fullWidth
            value={prixHT}
            onChange={(e) => setPrixHT(e.target.value)}
            error={!!errors.prixHT}
            helperText={errors.prixHT}
          />

          <TextField
            id="piece-prix-ttc"
            label="Prix TTC"
            variant="outlined"
            fullWidth
            value={prixTTC}
            onChange={(e) => setPrixTTC(e.target.value)}
            error={!!errors.prixTTC}
            helperText={errors.prixTTC}
          />

<FormControl fullWidth error={!!errors.typePiece}>
          <InputLabel>Type de Pièce</InputLabel>
          <Select
            value={typePiece}
            onChange={(e) => setTypePiece(e.target.value)}
            label="Type de Pièce"
          >
            {loading ? (
              <MenuItem disabled>Chargement...</MenuItem>
            ) : (
              typePieces.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.type}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.typePiece && <FormHelperText>{errors.typePiece}</FormHelperText>}
        </FormControl>
          <Button 
            variant="contained" 
            onClick={handleClick}
            disabled={loading}
          >
            Ajouter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

export default function TypeEdit() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  
  const [typePiece, setTypePiece] = useState({
    type: '',
    tarifH: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8088/type/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the type');
        }
        return response.json();
      })
      .then((data) => {
        setTypePiece(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypePiece((prevType) => ({
      ...prevType,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to backend
    fetch(`http://localhost:8088/type/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typePiece),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the type');
        }
        return response.json();
      })
      .then(() => {
        navigate('/Materiels/Types'); 
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Modifier Type de Pièce
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Type"
            name="type"
            value={typePiece.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tarif Horaire"
            name="tarifH"
            value={typePiece.tarifH}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Mettre à Jour
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

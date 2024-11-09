import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';

export default function ClientEdit() {
  const { id } = useParams(); // Get the client ID from the URL
  const navigate = useNavigate(); // To navigate after update
  const [client, setClient] = useState(null);  // Client data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch client data when the component mounts or `id` changes
  useEffect(() => {
    if (!id) {
      setError("Client ID is missing");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8088/client/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Client not found');
        }
        return response.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    fetch(`http://localhost:8088/client/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client), // Send the updated client data
    })
      .then(() => {
        console.log("Client updated successfully");
        navigate('/clients'); // Redirect to the client list after update
      })
      .catch(error => {
        console.error("Error updating client:", error);
      });
  };

  if (loading) {
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  if (!client) {
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">No client data found</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '500px' }}>
      <Typography variant="h6" gutterBottom>Modifier le client</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Nom"
          name="nom"
          value={client.nom}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Adresse"
          name="adresse"
          value={client.adresse}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Numéro Téléphone"
          name="numtel"
          value={client.numtel}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Mettre à jour
        </Button>
      </form>
    </Paper>
  );
}

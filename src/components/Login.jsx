import React, { useState } from 'react';
import { TextField, Button, Alert, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const hardcodedCredentials = {
      username: 'eya',
      password: 'eya',
      role: 'ACCUEIL', 
    };

    if (username === hardcodedCredentials.username && password === hardcodedCredentials.password) {
      setLoading(false);
      setMessage("Login successful!");
      setSeverity('success');
      setUser(hardcodedCredentials); // Set the user context

      navigate(`/service`); // Redirect to role-specific dashboard
    } else {
      setLoading(false);
      setMessage("Login failed. Please check your credentials.");
      setSeverity('error');
    }
  };

  return (
    <div className='container'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          maxWidth: 400,
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        {message && <Alert sx={{ mt: 2 }} severity={severity}>{message}</Alert>}
      </Box>
    </div>
  );
};

export default LoginForm;

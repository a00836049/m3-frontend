import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { TextField, Button, Paper, Typography, Alert, CircularProgress } from '@mui/material';
import { userAPI } from '../services/api';

function Login({ onLogin }) {
  const [form, setForm] = useState({ nombre: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      const response = await userAPI.login(form);
      const data = response.data;
      
      setMessage('¡Login exitoso!');
      // Pequeña pausa para mostrar el mensaje antes de redirigir
      setTimeout(() => {
        if (onLogin) onLogin(data.user, data.token);
        navigate('/menu');
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al iniciar sesión';
      setMessage('Error de conexión: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Ingresar'}
        </Button>
      </form>
      {message && (
        <Alert severity={message.startsWith('¡Login') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Paper>
  );
}

export default Login;

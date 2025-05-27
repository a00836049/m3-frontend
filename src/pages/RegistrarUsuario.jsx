import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { userAPI } from '../services/api';

function RegistrarUsuario() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    password: '',
    pelicula_favorita: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      // Verificar que hay un token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa');
      }
      
      await userAPI.create(form);
      setMessage('¡Usuario registrado correctamente!');
      setForm({ nombre: '', apellido: '', password: '', pelicula_favorita: '' });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Registrar Usuario</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Película Favorita"
          name="pelicula_favorita"
          value={form.pelicula_favorita}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
      {message && (
        <Alert severity={message.startsWith('¡Usuario registrado') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Paper>
  );
}

export default RegistrarUsuario;

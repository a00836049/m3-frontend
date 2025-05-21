import { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';

function Login({ onLogin }) {
  const [form, setForm] = useState({ nombre: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('¡Login exitoso!');
        if (onLogin) onLogin(data.user);
      } else {
        setMessage(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setMessage('Error de conexión: ' + err.message);
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
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Ingresar
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

import { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';

function RegistrarUsuario() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    password: '',
    pelicula_favorita: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/postusers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('¡Registro enviado correctamente!');
        setForm({ nombre: '', apellido: '', password: '', pelicula_favorita: '' });
      } else {
        const errorText = await res.text();
        setMessage('Error al enviar el registro: ' + errorText);
      }
    } catch (err) {
      setMessage('Error de conexión: ' + err.message);
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
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
      {message && (
        <Alert severity={message.startsWith('¡Registro') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Paper>
  );
}

export default RegistrarUsuario;

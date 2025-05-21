import { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';

function EditarUsuarios({ usuario, onVolver }) {
  const [form, setForm] = useState(usuario || {});
  const [message, setMessage] = useState('');

  if (!usuario) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`http://localhost:3000/updateuser/${form.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('¡Usuario actualizado correctamente!');
        setTimeout(() => {
          onVolver();
        }, 1000); // Espera breve para mostrar el mensaje antes de volver
      } else {
        const errorText = await res.text();
        setMessage('Error al actualizar: ' + errorText);
      }
    } catch (err) {
      setMessage('Error de conexión: ' + err.message);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Editar Usuario</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre || ''}
          onChange={handleChange}
          required
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={form.apellido || ''}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password || ''}
          onChange={handleChange}
          required
        />
        <TextField
          label="Película Favorita"
          name="pelicula_favorita"
          value={form.pelicula_favorita || ''}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
        <Button onClick={onVolver} variant="outlined" sx={{ mt: 1 }}>Volver</Button>
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      </form>
    </Paper>
  );
}

export default EditarUsuarios;

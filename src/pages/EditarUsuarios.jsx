 
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, TextField, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

function EditarUsuarios({ usuario }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(usuario || {});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!usuario) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    setSuccess(false);
    
    try {
      // Preparar los datos a enviar (solo los necesarios para actualizar)
      const datosActualizar = {
        nombre: form.nombre,
        apellido: form.apellido,
        pelicula_favorita: form.pelicula_favorita
      };
      
      // Verificar que hay un token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa');
      }
      
      await userAPI.update(form.id_usuario, datosActualizar);
      setMessage('¡Usuario actualizado correctamente!');
      setSuccess(true);
      setTimeout(() => {
        navigate('/lista');
      }, 1500);
    } catch (err) {
      setMessage('Error al actualizar: ' + (err.response?.data?.message || err.message));
      console.error('Error completo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate('/lista');
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
          disabled={loading}
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={form.apellido || ''}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField
          label="Película Favorita"
          name="pelicula_favorita"
          value={form.pelicula_favorita || ''}
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
          {loading ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
        <Button 
          onClick={handleVolver} 
          variant="outlined" 
          sx={{ mt: 1 }}
          disabled={loading}
        >
          Volver
        </Button>
        {message && (
          <Alert 
            severity={success ? "success" : "error"} 
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </form>
    </Paper>
  );
}

export default EditarUsuarios;

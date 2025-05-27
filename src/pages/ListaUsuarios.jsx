import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, CircularProgress, Alert} from '@mui/material';
import { userAPI } from '../services/api';

function ListaUsuarios({ onEditar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      setError('Error al cargar los usuarios: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await userAPI.delete(id);
        // Actualizar la lista después de eliminar
        fetchUsuarios();
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        setError('Error al eliminar usuario: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEditarClick = (usuario) => {
    onEditar(usuario);
    navigate(`/editar/${usuario.id_usuario}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2, mx: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Usuarios
      </Typography>

      {usuarios.length === 0 ? (
        <Typography>No hay usuarios registrados</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Película Favorita</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id_usuario}>
                  <TableCell>{usuario.id_usuario}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.pelicula_favorita}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditarClick(usuario)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleEliminar(usuario.id_usuario)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ListaUsuarios;

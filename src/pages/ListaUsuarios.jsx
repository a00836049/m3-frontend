import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Alert, Button
} from '@mui/material';
import BorrarUsuario from './Borrarusuarios';

function ListaUsuarios({ onEditar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch('http://localhost:3000/users');
        if (!res.ok) {
          throw new Error('Error al obtener usuarios');
        }
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuarios();
  }, []);

  const handleBorrado = (id_usuario) => {
    setUsuarios(usuarios.filter(u => u.id_usuario !== id_usuario));
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Lista de Usuarios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Nombre</b></TableCell>
            <TableCell><b>Apellido</b></TableCell>
            <TableCell><b>Película Favorita</b></TableCell>
            <TableCell><b>Acciones</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((u, idx) => (
            <TableRow key={idx}>
              <TableCell>{u.nombre}</TableCell>
              <TableCell>{u.apellido}</TableCell>
              <TableCell>{u.pelicula_favorita}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEditar && onEditar(u)}
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <BorrarUsuario usuario={u} onBorrado={handleBorrado} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListaUsuarios;

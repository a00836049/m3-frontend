import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { userAPI } from '../services/api';

function BorrarUsuario({ usuario, onBorrado }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await userAPI.delete(usuario.id_usuario);
      if (onBorrado) onBorrado(usuario.id_usuario);
    } catch (err) {
      alert('Error al borrar usuario: ' + (err.response?.data?.message || err.message));
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        size="small"
      >
        Borrar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Borrado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas borrar al usuario <b>{usuario.nombre} {usuario.apellido}</b>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BorrarUsuario;

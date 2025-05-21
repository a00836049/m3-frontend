import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

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
      await fetch(`http://localhost:3000/deleteuser/${usuario.id_usuario}`, {
        method: 'DELETE'
      });
      if (onBorrado) onBorrado(usuario.id_usuario);
    } catch {
      alert('Error al borrar usuario');
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

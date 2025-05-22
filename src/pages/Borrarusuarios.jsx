import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { userAPI } from '../services/api';

function BorrarUsuario({ usuario, onBorrado }) {
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setSuccessMessage(`Usuario ${usuario.nombre} ${usuario.apellido} borrado exitosamente`);
      if (onBorrado) onBorrado(usuario.id_usuario);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setErrorMessage(`Error al borrar usuario: ${message}`);
    } finally {
      setOpen(false);
    }
  };

  // Handle closing the success/error alerts
  const handleAlertClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
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
      
      {/* Success message */}
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={5000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      
      {/* Error message */}
      <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={5000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BorrarUsuario;

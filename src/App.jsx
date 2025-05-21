import { useState } from 'react'
import './App.css'
import RegistrarUsuario from './pages/RegistrarUsuario'
import ListaUsuarios from './pages/ListaUsuarios'
import EditarUsuarios from './pages/EditarUsuarios'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

function App() {
  const [view, setView] = useState('registrar');
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setView('editar');
  };

  const handleVolver = () => {
    setUsuarioEditar(null);
    setView('lista');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Button color="inherit" onClick={() => { setView('registrar'); setUsuarioEditar(null); }}>
              Registrar Usuario
            </Button>
            <Button color="inherit" onClick={() => { setView('lista'); setUsuarioEditar(null); }}>
              Lista de Usuarios
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {view === 'registrar' && <RegistrarUsuario />}
      {view === 'lista' && <ListaUsuarios onEditar={handleEditar} />}
      {view === 'editar' && <EditarUsuarios usuario={usuarioEditar} onVolver={handleVolver} />}
    </>
  )
}

export default App

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import RegistrarUsuario from './pages/RegistrarUsuario'
import ListaUsuarios from './pages/ListaUsuarios'
import EditarUsuarios from './pages/EditarUsuarios'
import Login from './pages/Login'
import MenuPrincipal from './pages/MenuPrincipal'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

// Componente para rutas autenticadas
const AuthRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// Componente para la estructura común con AppBar
const MainLayout = ({ usuarioAutenticado, onLogout, children }) => {
  const navigate = useNavigate();
  
  if (!usuarioAutenticado) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/menu')}
            >
              Menú Principal
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/registrar')}
            >
              Registrar Usuario
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/lista')}
            >
              Lista de Usuarios
            </Button>
          </Box>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {usuarioAutenticado.nombre}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

function App() {
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUsuarioAutenticado(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
  };

  const handleLogin = (usuario, token) => {
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    setUsuarioAutenticado(usuario);
  };

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUsuarioAutenticado(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          usuarioAutenticado ? 
            <Navigate to="/menu" replace /> : 
            <Login onLogin={handleLogin} />
        } />
        
        <Route 
          path="/menu" 
          element={
            <MainLayout usuarioAutenticado={usuarioAutenticado} onLogout={handleLogout}>
              <MenuPrincipal />
            </MainLayout>
          } 
        />
        
        <Route 
          path="/registrar" 
          element={
            <MainLayout usuarioAutenticado={usuarioAutenticado} onLogout={handleLogout}>
              <RegistrarUsuario />
            </MainLayout>
          } 
        />
        
        <Route 
          path="/lista" 
          element={
            <MainLayout usuarioAutenticado={usuarioAutenticado} onLogout={handleLogout}>
              <ListaUsuarios onEditar={handleEditar} />
            </MainLayout>
          } 
        />
        
        <Route 
          path="/editar/:id" 
          element={
            <MainLayout usuarioAutenticado={usuarioAutenticado} onLogout={handleLogout}>
              <EditarUsuarios usuario={usuarioEditar} />
            </MainLayout>
          } 
        />
        
        <Route path="/" element={<Navigate to={usuarioAutenticado ? "/menu" : "/login"} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

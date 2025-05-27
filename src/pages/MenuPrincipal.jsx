// eslint-disable-next-line no-unused-vars
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// eslint-disable-next-line no-unused-vars
import PeopleIcon from '@mui/icons-material/People';

function MenuPrincipal() {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Menú Principal
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <PeopleIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Lista de Usuarios
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph align="center">
                Ver y gestionar todos los usuarios registrados en el sistema.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/lista')}
                sx={{ mt: 'auto' }}
              >
                Ver Usuarios
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <PersonAddIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Registrar Usuario
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph align="center">
                Añadir un nuevo usuario al sistema con sus datos personales.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={() => navigate('/registrar')}
                sx={{ mt: 'auto' }}
              >
                Registrar Nuevo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MenuPrincipal;

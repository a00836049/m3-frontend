/**
 * Obtiene el token JWT del almacenamiento local
 * @returns {string|null} El token JWT o null si no existe
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Obtiene los headers de autenticación con el token JWT
 * @returns {Object} Objeto con headers incluyendo Authorization si hay token
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};

/**
 * Función para hacer peticiones autenticadas
 * @param {string} url - URL a la que hacer la petición
 * @param {Object} options - Opciones para fetch
 * @returns {Promise} Promesa con la respuesta
 */
export const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (response.status === 401) {
      // Token inválido o expirado, redirigir al login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Sesión expirada o inválida');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }
    
    return response;
  } catch (error) {
    console.error('Error en fetchWithAuth:', error);
    throw error;
  }
};

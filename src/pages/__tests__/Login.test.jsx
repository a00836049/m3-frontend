import { render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Login from '../Login';

// Mock completo del API
jest.mock('../../services/api', () => ({
  authAPI: {
    login: jest.fn()
  }
}));

// Mock del navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renderiza correctamente', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
});

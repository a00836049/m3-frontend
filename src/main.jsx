// eslint-disable-next-line no-unused-vars
import { StrictMode } from 'react'
// eslint-disable-next-line no-unused-vars
import { createRoot } from 'react-dom/client'
import './index.css'
// eslint-disable-next-line no-unused-vars
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

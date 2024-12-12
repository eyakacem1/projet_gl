import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './bootstrap/css/bootstrap.css'
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>  {/* Wrap your app with AuthProvider */}
      <App />
    </AuthProvider>  </StrictMode>,
)

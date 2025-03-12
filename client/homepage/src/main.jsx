import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    <Toaster />
    </AuthProvider>
  </StrictMode>,
)

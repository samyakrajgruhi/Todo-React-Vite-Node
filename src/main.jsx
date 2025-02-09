import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DisplayCalendar from './components/DisplayCalendar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <DisplayCalendar />
  </StrictMode>,
)

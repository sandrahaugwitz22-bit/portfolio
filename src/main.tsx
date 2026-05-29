import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // tailwind
import './App.css'   // your custom component/layout styles

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@app/app'

import './reset.css'
import './main.css'

const rootElement = document.getElementById('root') as HTMLElement

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

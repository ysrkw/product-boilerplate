import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import './style.css'

const app = document.querySelector('#app')

if (app) {
  const root = createRoot(app)

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

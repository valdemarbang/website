/*
  Main entry point of the application.
  It renders the App component into the root element.
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesHandler from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoutesHandler/>
  </React.StrictMode>,
)
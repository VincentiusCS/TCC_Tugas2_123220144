import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import "bulma/css/bulma.css";

const root = createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import "bulma/css/bulma.min.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('react-root');
  if (root) {
    createRoot(root).render(<App />);
  }
});

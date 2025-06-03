// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from 'react';
import { createRoot } from 'react-dom/client';
import Hello from './components/Hello';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('react-root');
  if (root) {
    createRoot(root).render(<Hello name="Rails 7" />);
  }
});
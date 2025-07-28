// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GenogramaEmocionalApp from './GenogramaEmocionalApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenogramaEmocionalApp />
  </React.StrictMode>
);

// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.error('Error registrando Service Worker:', error);
      });
  });
}

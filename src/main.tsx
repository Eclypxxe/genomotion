import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GenogramaEmocionalApp from './GenogramaEmocionalApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenogramaEmocionalApp />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

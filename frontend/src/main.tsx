import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import React from 'react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <App />
  </StrictMode>
);

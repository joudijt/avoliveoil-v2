import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './admin.css';
// must load before the router mounts: its Back-button listener has to run before React Router's
import './lib/navGuard';
import { AdminApp } from './App';

createRoot(document.getElementById('admin-root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>
);

// Centralized frontend config for environment values
// Vite exposes variables prefixed with VITE_

export const BACKEND_URL = (
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:5000'
).replace(/\/$/, '');

// Helper to build API URLs consistently
export const apiUrl = (path = '') => {
  const p = String(path || '');
  return `${BACKEND_URL}${p.startsWith('/') ? '' : '/'}${p}`;
};

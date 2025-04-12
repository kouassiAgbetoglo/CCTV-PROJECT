import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Store the original fetch function
const originalFetch = window.fetch;

// Override the global fetch
window.fetch = async (...args) => {
  let [url, options = {}] = args;
  
  // Apply default credentials and headers
  const modifiedOptions = {
    ...options,
    credentials: 'include', // Always include cookies
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json', // Default content type
    },
  };

  return originalFetch(url, modifiedOptions);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
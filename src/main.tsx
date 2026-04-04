import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. THIS IMPORT IS CRITICAL! Make sure the path matches your setup.
import './i18n'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Suspense is required to pause rendering until the JSON loads */}
    <Suspense fallback={<div className="min-h-screen bg-[#161622] flex items-center justify-center text-white">Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
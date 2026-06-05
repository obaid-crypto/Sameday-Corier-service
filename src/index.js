import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ===== SUPPRESS REACT-SCRIPTS BUG =====
// This is a known bug in react-scripts 5.0.1
// It injects code that tries to redefine userAgent
// We suppress it here so it doesn't show in console

if (typeof window !== 'undefined') {
    // Suppress the specific error
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = function (...args) {
        const errorMsg = String(args[0] || '');

        // Ignore these specific errors from react-scripts
        if (
            errorMsg.includes('Cannot redefine property: userAgent') ||
            errorMsg.includes('userAgent') ||
            errorMsg.includes('domainff')
        ) {
            return; // Don't show this error
        }

        // Show all other errors normally
        return originalError.apply(console, args);
    };

    console.warn = function (...args) {
        const warnMsg = String(args[0] || '');

        if (
            warnMsg.includes('userAgent') ||
            warnMsg.includes('domainff')
        ) {
            return;
        }

        return originalWarn.apply(console, args);
    };

    // Also block global error event
    window.addEventListener('error', (event) => {
        if (
            event.message?.includes('userAgent') ||
            event.message?.includes('domainff') ||
            event.filename?.includes('vm')
        ) {
            event.preventDefault();
            return false;
        }
    }, true);
}

// ===== START APP =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
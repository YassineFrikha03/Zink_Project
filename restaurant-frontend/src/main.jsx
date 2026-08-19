import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-toast)',
              color: 'var(--color-toast)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              iconTheme: {
                primary: '#F59E0B',
                secondary: '#000',
              },
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

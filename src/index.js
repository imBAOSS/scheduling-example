import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import App from './App';

// CONTEXTS/UTILS
import StoreProvider from './contexts/StoreContext';

// STYLES
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
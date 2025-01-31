import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Campaigns from './pages/Campaigns/Campaigns';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Campaigns />
  </React.StrictMode>
);

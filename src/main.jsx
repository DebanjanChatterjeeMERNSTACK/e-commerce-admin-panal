// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './assets/css/style.css';
import App from './App.jsx';
// import Popper from 'popper.js';

createRoot(document.getElementById('root')).render(
  <>
      <App />
   </>,
)

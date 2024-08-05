import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter} from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-confirm-alert/src/react-confirm-alert.css";
// import Login from './pages/Login';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

    <App />

    {/* <Login /> */}
    
    </BrowserRouter>
  </React.StrictMode>
);



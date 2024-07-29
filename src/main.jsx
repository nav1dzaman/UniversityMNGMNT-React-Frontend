import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './auth/AuthProvider.jsx';

import { ToastContainer, toast } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   <AuthProvider>
   <App/>
   <ToastContainer/>
   </AuthProvider>
       
   </BrowserRouter>
     
  </React.StrictMode>
)

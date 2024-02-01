import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './reduxToolkit/App/Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
  <ToastContainer/>
   <BrowserRouter>
      <App />
  </BrowserRouter>
 </Provider>
  
);
{/* <React.StrictMode></React.StrictMode> */}


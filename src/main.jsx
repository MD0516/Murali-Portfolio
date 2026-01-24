import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { router } from './Routes/Routes.jsx';
import { StateProvider } from './Context/StateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
)

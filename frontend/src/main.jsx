import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css'; // for Ant Design v5+
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
  
        <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <App />
    </ >
  // </StrictMode>
)

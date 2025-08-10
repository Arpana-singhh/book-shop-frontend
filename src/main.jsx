
import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter} from 'react-router-dom'

import { AppContextProvider } from '../context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AppContextProvider>
      <App/> 
    </AppContextProvider>
  </BrowserRouter>
   
)

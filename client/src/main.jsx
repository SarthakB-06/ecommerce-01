// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ProductDetail from './Pages/ProductDetail.jsx'
import {store , persistor} from './Redux/store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import { PersistGate } from'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
 <Provider store = {store}>
  <PersistGate loading ={null} persistor = {persistor}>
    <App />
  </PersistGate>
 </Provider>
)

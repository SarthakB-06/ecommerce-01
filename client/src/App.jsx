import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './Pages/ProductDetail';
import Products from './components/Products';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Render Products component for the root path */}
        <Route path="/detail/:id" element={<ProductDetail />} /> {/* Add route for ProductDetail with id parameter */}
      </Routes>
    </Router>
  );
}

export default App;
// src/App.js
import React, { useState } from 'react';
import NavContext from './Context/NavContext';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar/Navbar';
import Product from './Pages/Product';
import CartContext from './Context/CartContext';
import CartVisible from './Context/CartVisible';

const App = () => {
  const [cur,setCur] = useState("tech")
  const [cartData,setCartData] = useState([])
  const [cartVisible,setCartVisible] = useState(false)
  return (
    <NavContext.Provider value={[cur,setCur]} >
      <CartVisible.Provider value={[cartVisible,setCartVisible]} >

<CartContext.Provider value={[cartData,setCartData]} >
    <div >
      <Navbar/>
  
      <Routes>
    <Route path='/' element={<Home/>} /> 
    <Route path='/product/:id' element={<Product/>} /> 
      </Routes>
    </div>
</CartContext.Provider>
      </CartVisible.Provider>
    </NavContext.Provider>
  );
};

export default App;

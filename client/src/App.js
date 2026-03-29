import React from 'react';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import OrderStatus from './components/cart/OrderStatus';
import Checkout from './components/cart/Checkout';
import OrderSummary from './components/cart/OrderSummary';
import OrderSuccess from './components/cart/OrderSuccess';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Box, ThemeProvider, createTheme} from '@mui/material';
import ContextProvider from './context/ContextProvider';

import DetailView from './components/details/DetailView';
import ItemPage from './components/Items/ItemList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2874f0',
    },
    secondary: {
      main: '#f1f1f1',
    },
  },
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider > 
        <BrowserRouter>
        <Header/>
        <Box style={{marginTop: 54}}>
          <Routes>  
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<DetailView/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/order-summary" element={<OrderSummary/>}/>
            <Route path="/order-success" element={<OrderSuccess/>}/>
            <Route path="/item/:tag" element={<ItemPage />} />
            <Route path="/order-status" element={<OrderStatus />} />
          </Routes>
        </Box>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>

    );
}

export default App; 
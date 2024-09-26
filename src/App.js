import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import ProductDetails from './components/ProductDetails';
import SearchResults from './components/SearchResults';
import CategoryPage from './components/CategoryPage';
import OtherServices from './components/OtherServices';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <Routes>
                        
                        {/* Other routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route path="/other-services" element={<OtherServices />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

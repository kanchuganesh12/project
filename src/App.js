import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import ProductDetails from './components/ProductDetails'; // Import ProductDetails component
import SearchResults from './components/SearchResults'; // Import the SearchResults component
import CategoryPage from './components/CategoryPage';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        {/* Add a route for individual product details */}
                        <Route path="/products/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/category/:category" element={<CategoryPage />} /> {/* Category Page Route */}
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

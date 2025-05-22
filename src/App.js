import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';

function CartIcon() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  return (
    <Link to="/cart" className="relative text-xl">
      🛒
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
          <Link to="/" className="text-2xl font-bold">Ecommerce</Link>
          <CartIcon />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

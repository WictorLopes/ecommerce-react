import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function CartIcon() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  return (
    <Link
      to="/cart"
      className="relative text-2xl hover:scale-110 transition-transform duration-200"
      aria-label={`Carrinho com ${cartCount} itens`}
    >
      🛒
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md animate-pulse">
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
        <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg rounded-b-xl">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-extrabold text-white hover:text-gray-200 transition-colors duration-200"
          >
            Loja do Wictor
          </Link>
          <CartIcon />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#10B981",
              color: "#fff",
              fontWeight: "bold",
            },
          }}
        />
      </Router>
    </CartProvider>
  );
}

export default App;

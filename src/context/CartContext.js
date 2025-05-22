import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productWithSelection) => {
    const exists = cart.find(
      (item) =>
        item.id === productWithSelection.id &&
        item.selectedColor === productWithSelection.selectedColor &&
        item.selectedSize === productWithSelection.selectedSize
    );

    if (!exists) {
      setCart([...cart, productWithSelection]);
    }
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productToRemove.id &&
            item.selectedColor === productToRemove.selectedColor &&
            item.selectedSize === productToRemove.selectedSize
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

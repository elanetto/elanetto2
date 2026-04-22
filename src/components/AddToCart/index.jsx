import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === product._id);

      if (found) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          title: product.title.no,
          price: product.price,
          image: product.images?.[0],
          quantity: 1,
        },
      ];
    });
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // INCREASE
  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    increase,
    decrease,
  };
}
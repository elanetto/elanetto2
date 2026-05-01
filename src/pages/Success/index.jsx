import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";

export default function Success() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");

    if (saved) {
      const parsed = JSON.parse(saved);
      setOrder(parsed);
    }

    clearCart();
    localStorage.removeItem("lastOrder");
  }, []);

  const subtotal = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 500 ? 0 : order.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* 🎉 Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Tusen takk for kjøpet! 🎉
        </h1>
        <p className="text-gray-600">
          Bestillingen din er mottatt og behandles nå 💌
        </p>
      </div>

      {/* 🧾 Order card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Kvittering
        </h2>

        {/* 🛍 Produkter */}
        <div className="flex flex-col gap-4">
          {order.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] gap-4 items-center"
            >
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-lg"
              />

              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × {item.price} kr
                </p>
              </div>

              <p className="font-semibold">
                {item.price * item.quantity} kr
              </p>
            </div>
          ))}
        </div>

        {/* 💰 Summary */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Produkter</span>
            <span>{subtotal} kr</span>
          </div>

          <div className="flex justify-between">
            <span>Frakt</span>
            <span>
              {shipping === 0 ? "Gratis 🎉" : `${shipping} kr`}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Totalt</span>
            <span>{total} kr</span>
          </div>
        </div>
      </div>

      {/* 🔁 CTA */}
      <div className="text-center mt-8">
        <Link
          to="/produkter"
          className="inline-block bg-[#6e3b34] text-white px-6 py-3 rounded-xl hover:opacity-90"
        >
          Fortsett å handle
        </Link>
      </div>
    </div>
  );
}
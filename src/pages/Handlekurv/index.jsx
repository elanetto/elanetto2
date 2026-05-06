import { useCartStore } from "../../store/cartStore";
import { urlFor } from "../../lib/image";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [loading, setLoading] = useState(false);

  const increase = (item) => {
    updateQuantity(item.cartKey, item.quantity + 1);
  };

  const decrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.cartKey);
    } else {
      updateQuantity(item.cartKey, item.quantity - 1);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 500 ? 0 : cart.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const items = cart.map((item) => ({
        _id: item._id,
        title: item.title?.no || item.title || "Produkt",
        price: item.price,
        quantity: item.quantity,
        isBundle: item.isBundle || false,
        image: item.images?.[0]
          ? urlFor(item.images[0]).width(500).url()
          : null,
      }));

      localStorage.setItem("lastOrder", JSON.stringify(items));

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL");
      }
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Noe gikk galt med betaling 😬");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Handlekurv</h1>

      {cart.length === 0 && <p>Handlekurven er tom 🥺</p>}

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.cartKey}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 bg-white rounded-xl p-4 shadow"
          >
            {/* 🔗 LINK (kun for vanlige produkter) */}
            {!item.isBundle ? (
              <Link
                to={`/produkt/${item.slug?.current}`}
                className="contents group cursor-pointer"
              >
                <img
                  src={
                    item.images?.[0]
                      ? urlFor(item.images[0]).width(100).url()
                      : "https://via.placeholder.com/100"
                  }
                  alt={item.title?.no || "Produktbilde"}
                  className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition"
                />

                <div>
                  <h2 className="font-medium group-hover:underline">
                    {item.title?.no || "Ukjent produkt"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.price} kr per stk
                  </p>
                </div>
              </Link>
            ) : (
              // 🧩 BUNDLE VISNING
              <>
                <div className="w-16 h-16 bg-[#e8b6b9] rounded-lg flex items-center justify-center">
                  🎁
                </div>

                <div>
                  <h2 className="font-medium">
                    {item.title || "Produktpakke"}
                  </h2>
                  <p className="text-sm text-purple-600">
                    Pakkepris 💸 {item.price} kr
                  </p>
                </div>
              </>
            )}

            {/* ➕➖ */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <span className="w-6 text-center">{item.quantity}</span>

              <button
                onClick={() => increase(item)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* 💰 TOTAL */}
            <p className="font-semibold min-w-[80px] text-right">
              {item.price * item.quantity} kr
            </p>
          </div>
        ))}
      </div>

      {subtotal > 0 && subtotal < 500 && (
        <div className="mt-6 bg-white/60 rounded-xl px-4 py-3 text-sm text-center">
          <p>
            Du mangler{" "}
            <span className="font-semibold">{500 - subtotal} kr</span> for
            gratis frakt 🎁
          </p>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 flex flex-col items-end gap-2">
          <div className="w-full max-w-xs space-y-2 text-right">
            <div className="flex justify-between text-sm">
              <span>Produkter</span>
              <span>{subtotal} kr</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Porto</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Gratis 🎉</span>
                ) : (
                  `${shipping} kr`
                )}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Totalt</span>
              <span>{total} kr</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-4 px-6 py-3 rounded-xl text-white transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6e3b34] hover:opacity-90"}
            `}
          >
            {loading ? "Sender deg til betaling..." : "Gå til betaling"}
          </button>
        </div>
      )}
    </div>
  );
}
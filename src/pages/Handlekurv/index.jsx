import { useCartStore } from "../../store/cartStore";
import { urlFor } from "../../lib/image";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const increase = (item) => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const decrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 500 ? 0 : cart.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Handlekurv</h1>

      {cart.length === 0 && <p>Handlekurven er tom 🥺</p>}

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 bg-white rounded-xl p-4 shadow"
          >
            {/* LINK */}
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
                <p className="text-sm text-gray-500">{item.price} kr per stk</p>
              </div>
            </Link>

            {/* QUANTITY */}
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

            {/* PRICE */}
            <p className="font-semibold min-w-[80px] text-right">
              {item.price * item.quantity} kr
            </p>
          </div>
        ))}
      </div>

      {/* 🚚 GRATIS FRAKT MELDING */}
      {subtotal > 0 && subtotal < 500 && (
        <div className="mt-6 bg-white/60 rounded-xl px-4 py-3 text-sm text-center">
          <p>
            Du mangler{" "}
            <span className="font-semibold">{500 - subtotal} kr</span> for
            gratis frakt 🎁
          </p>
        </div>
      )}

      {/* 💰 SUMMARY */}
      {cart.length > 0 && (
        <div className="mt-8 flex flex-col items-end gap-2">
          <div className="w-full max-w-xs space-y-2 text-right">
            {/* DELSUM */}
            <div className="flex justify-between text-sm">
              <span>Produkter</span>
              <span>{subtotal} kr</span>
            </div>

            {/* PORTO */}
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

            {/* TOTAL */}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Totalt</span>
              <span>{total} kr</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-4 bg-[#6e3b34] text-white px-6 py-3 rounded-xl hover:opacity-90">
            Gå til betaling
          </button>
        </div>
      )}
    </div>
  );
}

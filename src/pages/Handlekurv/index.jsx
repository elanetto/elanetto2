import { useCartStore } from "../../store/cartStore";
import { urlFor } from "../../lib/image";

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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            {/* IMAGE */}
            <img
              src={
                item.images?.[0]
                  ? urlFor(item.images[0]).width(100).url()
                  : "https://via.placeholder.com/100"
              }
              alt={item.title?.no || "Produktbilde"}
              className="w-16 h-16 object-cover rounded-lg"
            />

            {/* TITLE + PRICE */}
            <div>
              <h2 className="font-medium">
                {item.title?.no || "Ukjent produkt"}
              </h2>
              <p className="text-sm text-gray-500">
                {item.price} kr per stk
              </p>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <span className="w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increase(item)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* TOTAL PRICE */}
            <p className="font-semibold min-w-[70px] text-right">
              {item.price * item.quantity} kr
            </p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <p className="text-lg font-semibold">
            Totalt: {total} kr
          </p>

          <button className="bg-[#6e3b34] text-white px-6 py-3 rounded-xl hover:opacity-90">
            Gå til betaling
          </button>
        </div>
      )}
    </div>
  );
}
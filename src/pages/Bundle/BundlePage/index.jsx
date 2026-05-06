import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/image";
import { useCartStore } from "../../../store/cartStore";

export default function BundlePage() {
  const { slug } = useParams();
  const [bundle, setBundle] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "bundle" && slug.current == $slug][0]{
          title,
          description,
          image,
          products[]->{
            _id,
            title,
            price,
            images
          }
        }`,
        { slug }
      )
      .then(setBundle);
  }, [slug]);

  if (!bundle) return <p className="p-6">Laster pakke...</p>;

  // 💸 PRISLOGIKK
  const total = bundle.products.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );

  const discounted = total * 0.8;
  const bundlePrice = Math.round(discounted / 5) * 5;
  const savings = total - bundlePrice;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* IMAGE */}
        <div className="bg-[#e8b6b9] rounded-2xl p-10 flex items-center justify-center h-[400px]">
          {bundle.image && (
            <img
              src={urlFor(bundle.image).width(800).url()}
              alt={bundle.title}
              className="max-h-full object-contain"
            />
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{bundle.title}</h1>

          {/* 💸 PRISVISNING */}
          <div className="mb-4">
            <p className="line-through text-gray-400">{total} kr</p>

            <p className="text-3xl font-bold text-[#6e3b34]">
              {bundlePrice} kr
            </p>

            {savings > 0 && (
              <p className="text-green-600 font-medium">
                Spar {savings} kr 🎉
              </p>
            )}
          </div>

          <p className="text-gray-700 mb-6">{bundle.description}</p>

          {/* 🧩 PRODUKTER I PAKKEN */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Inneholder:</h2>

            <div className="flex flex-col gap-2">
              {bundle.products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 bg-white/50 p-2 rounded-lg"
                >
                  {p.images?.[0] && (
                    <img
                      src={urlFor(p.images[0]).width(100).url()}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}

                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.title?.no}</p>
                    <p className="text-xs text-gray-500">{p.price} kr</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🛒 ADD TO CART */}
          <button
            onClick={() =>
              addToCart({
                ...bundle,
                price: bundlePrice,
                isBundle: true,
              })
            }
            className="py-3 rounded-xl text-white bg-[#6e3b34] hover:opacity-90"
          >
            Legg pakke i handlekurv
          </button>
        </div>
      </div>
    </div>
  );
}
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../../lib/sanity";
import { urlFor } from "../../../lib/image";
import { useCartStore } from "../../../store/cartStore";
import ImageGallery from "../../../components/ImageGallery";

export default function BundlePage() {
  const { slug } = useParams();
  const [bundle, setBundle] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "bundle" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          image,
          products[]->{
            _id,
            title,
            price,
            "slug": slug.current,
            images
          }
        }`,
        { slug },
      )
      .then(setBundle);
  }, [slug]);

  if (!bundle) return <p className="p-6">Laster pakke...</p>;

  // 💸 PRISLOGIKK
  const total = bundle.products.reduce((sum, p) => sum + (p.price || 0), 0);
  const discounted = total * 0.8;
  const bundlePrice = Math.round(discounted / 5) * 5;
  const savings = total - bundlePrice;

  // 🖼️ COMBINED IMAGES (bundle + produkter)
  const bundleImages = [
    bundle.image,
    ...bundle.products.map((p) => p.images?.[0]).filter(Boolean),
  ].filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {/* 🖼️ GALLERY */}
          <ImageGallery images={bundleImages} title={bundle.title} />

          {/* 🧩 PRODUKTER UNDER BILDE */}
          <div>
            <h2 className="font-semibold mb-3">Inneholder:</h2>

            <div className="flex flex-col gap-2">
              {bundle.products.map((p) => (
                <Link
                  key={p._id}
                  to={p.slug ? `/produkt/${p.slug}` : "#"}
                  className="flex items-center gap-3 bg-white/50 p-2 rounded-lg hover:bg-white/80 transition group"
                >
                  {/* IMAGE */}
                  {p.images?.[0]?.asset && (
                    <img
                      src={urlFor(p.images[0]).width(100).url()}
                      className="w-12 h-12 object-cover rounded group-hover:scale-105 transition"
                      alt={p.title?.no || p.title}
                    />
                  )}

                  {/* TEXT */}
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:underline">
                      {p.title?.no || p.title}
                    </p>
                    <p className="text-xs text-gray-500">{p.price} kr</p>
                  </div>

                  {/* 👉 LITTLE ARROW */}
                  <span className="text-gray-400 group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-start pt-2 gap-4">
          <h1 className="text-3xl font-bold">{bundle.title}</h1>

          {/* 💸 PRIS */}
          <div>
            <p className="line-through text-gray-400">{total} kr</p>

            <p className="text-3xl font-bold text-[#6e3b34]">
              {bundlePrice} kr
            </p>

            {savings > 0 && (
              <p className="text-green-600 font-medium">Spar {savings} kr 🎉</p>
            )}
          </div>

          <p className="text-gray-700">{bundle.description}</p>

          {/* 🛒 ADD TO CART */}
          <button
            onClick={() => {
              addToCart({
                ...bundle,
                price: bundlePrice,
                isBundle: true,
                images: bundleImages,
              });

              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className={`mt-2 py-4 rounded-xl text-white text-lg transition-all duration-300 flex items-center justify-center gap-2
            ${
              added
                ? "bg-red-950 scale-105 animate-bounce"
                : "bg-[#6e3b34] hover:opacity-90"
            }`}
          >
            {added ? (
              <>
                <span className="text-white font-bold">✓</span>
                Lagt til!
              </>
            ) : (
              "Legg pakke i handlekurv"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

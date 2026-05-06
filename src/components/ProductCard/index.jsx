import { urlFor } from "../../lib/image";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = product.images?.[0];

  const imageUrl =
    image && image.asset
      ? urlFor(image).width(600).url()
      : "https://via.placeholder.com/600x600?text=No+image";

  const link = product.isBundle
    ? `/pakke/${product.slug?.current}`
    : `/produkt/${product.slug?.current}`;

  return (
    <Link
      to={product.slug?.current ? link : "#"}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <div className="relative bg-[#e8b6b9] p-6 h-80 flex items-center justify-center">
        {/* 🖼️ IMAGE */}
        <img
          src={imageUrl}
          alt={product.title?.no || "Produkt"}
          className="w-full h-full object-contain drop-shadow-md transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]"
        />

        {/* 🎁 BUNDLE BADGE */}
        {product.isBundle && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow">
            Pakke 🎁
          </span>
        )}

        {/* 💰 INFO */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#6e3b34]/95 to-[#6e3b34]/70 text-white px-4 py-2 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight mb-0.5">
              {product.title?.no || product.title || "Ukjent produkt"}
            </h3>

            <p className="text-xs uppercase opacity-80">
              {product.isBundle
                ? "Pakke"
                : product.category === "sticker"
                  ? "Klistremerke"
                  : product.category === "bookmark"
                    ? "Bokmerke"
                    : product.category === "card"
                      ? "Kort"
                      : ""}
            </p>
          </div>

          <p className="text-lg font-semibold whitespace-nowrap">
            {product.price} kr
          </p>
        </div>
      </div>
    </Link>
  );
}

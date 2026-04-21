import { urlFor } from "../../lib/image";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={product.slug?.current ? `/produkt/${product.slug.current}` : "#"}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <div className="relative bg-[#e8b6b9] p-6 h-80 flex items-center justify-center">
        <img
          src={urlFor(product.image).width(600).url()}
          alt={product.title?.no}
          className="w-full h-full object-contain drop-shadow-md transition duration-300 hover:-translate-y-2 hover:scale-[1.02]"
        />

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#6e3b34]/95 to-[#6e3b34]/70 text-white px-4 py-2 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight mb-0.5">
              {product.title?.no}
            </h3>

            <p className="text-xs uppercase opacity-80">
              {product.category === "sticker" && "Klistremerke"}
              {product.category === "bookmark" && "Bokmerke"}
              {product.category === "card" && "Kort"}
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

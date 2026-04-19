import { urlFor } from "../../lib/image";

export default function ProductCard({ product, link }) {
  return (
    <a
      href={link || "#"}
      className="group bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="bg-rose-200 overflow-hidden">
        <img
          src={urlFor(product.image).width(400).url()}
          alt={product.title?.no}
          className="w-full h-48 object-cover transition duration-200 group-hover:scale-110"
        />
      </div>

      {/* Bottom bar */}
      <div className="bg-pink-300 py-2 px-2 text-center">
        <h3 className="font-semibold text-white text-sm">
          {product.title?.no}
        </h3>
        <p className="text-white text-xs">{product.price} kr</p>
      </div>
    </a>
  );
}
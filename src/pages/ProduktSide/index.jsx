import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { useCartStore } from "../../store/cartStore";
import ReviewList from "../../components/Review/ReviewList";
import ReviewForm from "../../components/Review/ReviewForm";
import ImageGallery from "../../components/ImageGallery";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug })
      .then(setProduct);
  }, [slug]);

  if (!product) return <p className="p-6">Laster produkt...</p>;

  if (!product.images?.length) {
    return <p className="p-6">Mangler bilde</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* 🖼️ IMAGE GALLERY */}
        <ImageGallery images={product.images} title={product.title?.no} />

        {/* INFO */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{product.title?.no}</h1>

          <p className="text-sm uppercase text-gray-500 mb-3">
            {product.category === "sticker" && "Klistremerke"}
            {product.category === "bookmark" && "Bokmerke"}
            {product.category === "card" && "Kort"}
          </p>

          <p className="text-2xl font-semibold mb-4">{product.price} kr</p>

          <p className="text-sm mb-5">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✔ På lager</span>
            ) : (
              <span className="text-red-500 font-medium">Ikke på lager</span>
            )}
          </p>

          {/* DECRIPTION */}
          <div className="mb-4">
            <p
              className={`text-gray-700 whitespace-pre-line transition-all duration-300 ${
                expanded ? "" : "line-clamp-6"
              }`}
            >
              {product.description?.no}
            </p>

            {product.description?.no?.length > 300 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-medium text-[#6e3b34] hover:underline"
              >
                {expanded ? "Vis mindre" : "Les mer"}
              </button>
            )}
          </div>

          {product.size?.width && product.size?.height && (
            <div className="bg-white/60 rounded-lg px-4 py-3 mb-6 text-sm">
              <p className="font-medium">Størrelse</p>
              <p>
                {product.size.width} × {product.size.height} cm
              </p>
            </div>
          )}

          {/* 🛒 ADD TO CART */}
          <button
            onClick={() => {
              addToCart(product);
              setAdded(true);

              setTimeout(() => {
                setAdded(false);
              }, 1500);
            }}
            className={`py-3 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-2
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
              "Legg i handlekurv"
            )}
          </button>
        </div>
      </div>

      {/* ⭐ REVIEWS */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-bold mb-4">Anmeldelser</h2>

        <ReviewList productId={product._id} />

        <div className="mt-8">
          <ReviewForm productId={product._id} />
        </div>
      </div>
    </div>
  );
}

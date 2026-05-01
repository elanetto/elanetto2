import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/image";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import ReviewList from "../../components/Review/ReviewList";
import ReviewForm from "../../components/Review/ReviewForm";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  // IMAGE STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // SWIPE STATE
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug })
      .then(setProduct);
  }, [slug]);

  if (!product) return <p className="p-6">Laster produkt...</p>;

  const images = product.images || [];

  if (!images.length) {
    return <p className="p-6">Mangler bilde</p>;
  }

  const currentImage = images[currentIndex];

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }

    if (distance < -50) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE GALLERY */}
        <div className="flex flex-col gap-4">
          <div
            className="bg-[#e8b6b9] rounded-2xl p-10 flex items-center justify-center h-[450px] cursor-zoom-in relative group"
            onClick={() => setIsOpen(true)}
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={handleSwipe}
          >
            <img
              src={urlFor(currentImage).width(800).url()}
              alt={currentImage?.alt || product.title?.no}
              className="max-h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full"
                >
                  ‹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full"
                >
                  ›
                </button>
              </>
            )}

            {currentImage?.alt && (
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs px-4 py-2 rounded-b-2xl">
                {currentImage.alt}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border ${
                    currentIndex === index
                      ? "border-[#6e3b34]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={urlFor(img).width(200).url()}
                    alt={img?.alt || product.title?.no}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

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

          <p className="text-gray-700 mb-4">{product.description?.no}</p>

          {product.size?.width && product.size?.height && (
            <div className="bg-white/60 rounded-lg px-4 py-3 mb-6 text-sm">
              <p className="font-medium">Størrelse</p>
              <p>
                {product.size.width} × {product.size.height} cm
              </p>
            </div>
          )}

          <button
            onClick={() => {
              addToCart(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className={`py-3 rounded-xl ${
              added
                ? "bg-yellow-950 text-white"
                : "bg-[#6e3b34] text-white"
            }`}
          >
            {added ? "Lagt til!" : "Legg i handlekurv"}
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-bold mb-4">Anmeldelser</h2>

        <ReviewList productId={product._id} />

        <div className="mt-8">
          <ReviewForm productId={product._id} />
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={urlFor(currentImage).width(1000).url()}
              alt={currentImage?.alt || product.title?.no}
              className="max-h-[90vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
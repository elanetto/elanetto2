import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/image";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  // IMAGE STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    client
      .fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug })
      .then(setProduct);
  }, [slug]);

  if (!product) return <p className="p-6">Laster produkt...</p>;

  const images = product.images || [];

  // EDGE CASE
  if (!images.length) {
    return <p className="p-6">Mangler bilde</p>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE GALLERY */}
        <div className="flex flex-col gap-4">
          {/* MAIN IMAGE */}
          <div
            className="bg-[#e8b6b9] rounded-2xl p-10 flex items-center justify-center h-[450px] cursor-zoom-in relative group"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={urlFor(currentImage).width(800).url()}
              alt={currentImage?.alt || product.title?.no}
              className="max-h-full object-contain"
            />

            {/* PIL VENSTRE */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition"
              >
                ‹
              </button>
            )}

            {/* PIL HØYRE */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition"
              >
                ›
              </button>
            )}

            {/* TOOLTIP */}
            {currentImage?.alt && (
              <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm text-white text-xs md:text-sm px-4 py-2 
                opacity-100 md:opacity-0 md:group-hover:opacity-100 
                transition duration-300 rounded-b-2xl">
                {currentImage.alt}
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
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

          {/* PÅ LAGER */}
          <p className="text-sm mb-5">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✔ På lager</span>
            ) : (
              <span className="text-red-500 font-medium">Ikke på lager</span>
            )}
          </p>

          {/* BESKRIVELSE */}
          <p className="text-gray-700 mb-4 leading-relaxed">
            {product.description?.no}
          </p>

          {/* FARGE INFO */}
          <p className="text-xs text-gray-500 mb-6 italic">
            Merk: Farger kan variere noe fra hvordan de vises på skjerm til det fysiske produktet.
          </p>

          {/* STØRRELSE */}
          {product.size?.width && product.size?.height && (
            <div className="bg-white/60 rounded-lg px-4 py-3 mb-6 text-sm">
              <p className="font-medium mb-1">Størrelse</p>
              <p>
                {product.size.width} × {product.size.height} cm
              </p>
            </div>
          )}

          {/* TAGS */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#6e3b34]/10 text-[#6e3b34] text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <button className="bg-[#6e3b34] text-white py-3 rounded-xl hover:opacity-90 transition">
            Legg i handlekurv
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-zoom-out p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-5xl w-full flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white text-3xl z-10 hover:scale-110 transition"
            >
              ✕
            </button>

            <img
              src={urlFor(currentImage).width(1000).url()}
              alt={currentImage?.alt || product.title?.no}
              className="max-h-[90vh] w-auto object-contain rounded-xl shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
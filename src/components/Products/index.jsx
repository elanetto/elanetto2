import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/image";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "product"]`).then((data) => setProducts(data));
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Alle produkter</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-xl p-4 shadow hover:shadow-lg hover:-translate-y-1 transition duration-200 flex flex-col cursor-pointer"
          >
            {/* Image wrapper */}
            <div className="bg-rose-200 rounded-lg mb-3 overflow-hidden">
              <img
                src={urlFor(product.image).width(300).url()}
                alt={product.title?.no}
                className="w-full h-48 object-cover transition duration-200 group-hover:scale-105"
              />
            </div>

            <h2 className="text-sm font-medium mt-2">
              {product.title?.no}
            </h2>

            <p className="text-sm font-semibold mt-auto">
              {product.price} kr
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
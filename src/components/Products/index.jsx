import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import ProductCard from "../ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "product"]`).then(setProducts);
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Alle produkter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            link={`#/produkt/${product.slug?.current}`}
          />
        ))}
      </div>
    </div>
  );
}
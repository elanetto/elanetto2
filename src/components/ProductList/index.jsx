import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import ProductCard from "../ProductCard"

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]`)
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
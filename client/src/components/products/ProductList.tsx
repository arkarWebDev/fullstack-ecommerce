import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <main className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          name={product.name}
          image={product.images[0].url}
          ratingCount={product.rating}
          price={product.price}
          key={product._id}
          id={product._id}
        />
      ))}
    </main>
  );
}

export default ProductList;

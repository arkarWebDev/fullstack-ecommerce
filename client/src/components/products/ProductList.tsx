import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Black T-Shirt",
    price: 200,
    category: "T-shirt",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 4,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: 300,
    category: "Hoodie",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 5,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 3,
    name: "Taiwan Jeans",
    price: 220,
    category: "Jeans",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 2,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 4,
    name: "Shorts",
    price: 100,
    category: "Shorts",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 4,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 5,
    name: "Black Shirt",
    price: 200,
    category: "Shirt",
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 3,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
];

function ProductList() {
  return (
    <main className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          name={product.name}
          image={product.images[0].url}
          ratingCount={product.rating}
          price={product.price}
          key={product.id}
        />
      ))}
    </main>
  );
}

export default ProductList;

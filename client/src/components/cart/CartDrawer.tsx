import { X } from "lucide-react";
import CartItem from "./CartItem";

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

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart(): void;
}

function CartDrawer({ isCartOpen, toggleCart }: CartDrawerProps) {
  return (
    <div
      className={`bg-white fixed top-0 right-0 w-1/4 h-full transform transition-transform duration-300 z-50 p-4 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end w-full">
        <X onClick={toggleCart} />
      </div>
      <h2 className="text-2xl font-bold my-4">YOUR CART</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem
            name={product.name}
            price={product.price}
            color={product.colors[0]}
            size={product.size[0]}
            image={product.images[0].url}
            key={product.id}
          />
        ))}
      </div>
      <button
        className="bg-black w-full
       py-4 text-white rounded-md fixed bottom-1 left-0 mb-2"
      >
        Go to Checkout
      </button>
    </div>
  );
}

export default CartDrawer;

import { X } from "lucide-react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "../ui/button";
import { clearCart } from "@/store/slices/cart";
import { useCreateCheckOutSessionMutation } from "@/store/slices/orderApi";

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart(): void;
}

function CartDrawer({ isCartOpen, toggleCart }: CartDrawerProps) {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const productInCart = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckOutSessionMutation();
  const bill = products.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const checkoutHandler = async () => {
    try {
      const { url } = await createCheckoutSession({
        items: products,
        bill,
      }).unwrap();
      window.location.href = url;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`bg-white fixed top-0 right-0 w-1/4 transform transition-transform duration-300 z-50 p-4 h-screen overflow-y-scroll border-l-2 border-l-gray-200 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end w-full cursor-pointer">
        <X onClick={toggleCart} />
      </div>
      <div
        className=" mt-4 mb-8 flex items-center justify-between"
        onClick={() => dispatch(clearCart())}
      >
        <h2 className="text-2xl font-bold">YOUR CART</h2>
        {productInCart > 2 && (
          <Button
            className=" cursor-pointer"
            size={"sm"}
            variant={"destructive"}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem
            name={product.name}
            price={Number(product.price)}
            color={product.color}
            size={product.size}
            image={product.image}
            key={product.key!}
            productKey={product.key!}
            quantity={product.quantity}
          />
        ))}
      </div>
      {products.length === 0 && (
        <div>
          <p>No products in cart.</p>
        </div>
      )}
      {products.length > 0 && (
        <button
          className="bg-black w-full
       py-4 text-white rounded-md cursor-pointer"
          onClick={checkoutHandler}
          disabled={isLoading}
        >
          Go to Checkout
        </button>
      )}
    </div>
  );
}

export default CartDrawer;

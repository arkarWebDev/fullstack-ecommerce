import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/slices/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

interface CartItemProps {
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  productKey: string;
}

function CartItem({
  name,
  size,
  color,
  price,
  image,
  quantity,
  productKey,
}: CartItemProps) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between border-b pb-4 border-b-gray-200">
      <div className="flex gap-2 items-center">
        <img src={image} alt={name} className="w-24 h-24 rounded-md" />
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-xs font-medium text-gray-400">
            size - {size}
          </span>
          <span className="text-xs font-medium text-gray-400">
            color - {color}
          </span>
          <span className="font-bold mt-1 text-lg">${price}</span>
        </div>
      </div>
      <div className="flex items-end flex-col justify-between">
        <Trash2
          className="w-6 h-6 text-red-600 cursor-pointer"
          onClick={() => dispatch(removeFromCart(productKey))}
        />
        <div className="flex items-center gap-2">
          <button
            className="bg-black p-2 text-white rounded-md"
            onClick={() => dispatch(decreaseQuantity(productKey))}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            className="bg-black p-2 text-white rounded-md"
            onClick={() => dispatch(increaseQuantity(productKey))}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

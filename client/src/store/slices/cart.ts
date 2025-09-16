import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  key?: string; // unique productId_size_color
  productId: string;
  name: string;
  size: string;
  color: string;
  price: string;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, size, color, name, price, image, quantity } =
        action.payload;
      const key = `${productId}_${size}_${color}`;
      const existing = state.items.find((item) => item.key === key);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          key,
          productId,
          name,
          size,
          color,
          price,
          image,
          quantity,
        });
      }
    },
    increaseQuantity(state, action) {
      const existing = state.items.find((item) => item.key === action.payload);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const existing = state.items.find((item) => item.key === action.payload);
      if (existing && existing.quantity > 0) {
        existing.quantity -= 1;
      }
      if (existing?.quantity === 0) {
        state.items = state.items.filter((item) => item.key !== action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

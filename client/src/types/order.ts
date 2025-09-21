export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  bill: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  customer: string;
};

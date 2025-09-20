import mongoose, { Schema, Types } from "mongoose";

export interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderDocument extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  bill: number;
  customer: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentIntentId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    bill: { type: Number, required: true },
    customer: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentIntentId: { type: String },
    stripeSessionId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDocument>("Order", orderSchema);
export default Order;

import mongoose, { Schema, Types } from "mongoose";
import { orderItemSchema } from "./order";

const tempCartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  items: { type: [orderItemSchema], required: true },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 60 * 1000),
    index: { expires: 0 },
  },
});

const TempCart = mongoose.model("TempCart", tempCartSchema);
export default TempCart;

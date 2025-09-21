import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddlewar";
import asyncHandler from "../utils/asyncHandler";
import Stripe from "stripe";
import Order, { OrderItem } from "../models/order";
import TempCart from "../models/tempCart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

// @route GET | api/create-order
// @desc Add new order and request stirpe session
// @access Private/User
export const createOrderAndCheckOutSession = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { items, bill } = req.body;
    const customer = req.user;

    const line_items = items.map((item: OrderItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
            color: item.color,
            size: item.size,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const tempCart = await TempCart.create({
      items,
      userId: customer?._id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancelled`,
      metadata: {
        customerId: customer?._id?.toString()!,
        bill: bill.toString(),
        customer: customer?.email?.toString()!,
        tempCartId: tempCart.id,
      },
    });

    res.status(200).json({ url: session.url });
  }
);

// @route GET | api/confirm-order/session_id
// @desc Confirm session id and send back order infomation
// @access Private/User
export const confirmSessionId = asyncHandler(
  async (req: Request, res: Response) => {
    const session_id = req.params.session_id;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      res.status(403);
      throw new Error("Payment not completed");
    }

    const order = await Order.findOne({ stripeSessionId: session.id });

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.status(200).json(order);
  }
);

// @route GET | api/orders
// @desc Get order by current user id
// @access Private/User
export const getOrderByUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
);

// @route GET | api/orders/all
// @desc Get all order
// @access Private/Admin
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
);

// @route PATCH | api/orders/:orderId
// @desc Change order status
// @access Private/Admin
export const changeOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    res.status(200).json(updatedOrder);
  }
);

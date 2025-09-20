import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect";

import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import errorHandler from "./middlewares/errorHandler";
import stripe from "stripe";
import Order from "./models/order";
import TempCart from "./models/tempCart";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const endpointSecret =
  "whsec_0cbff1b690f013ccadfd31433ac30888328ce8e6b5f3bf3443dd3365df729fa1";

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    console.log("Stripe webhook is online.");

    let event = req.body;
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        if (!signature) {
          throw new Error("Signature not found.");
        }
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        res.sendStatus(400);
        return;
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        console.log("EVENT TYPE===>", event.type);

        try {
          const session = event.data.object;
          console.log(event.data, session);

          const userId = session.metadata.customerId;
          const email = session.metadata.customer;
          const bill = Number(session.metadata.bill);
          const tempCartId = session.metadata.tempCartId;

          if (!userId || !email || !bill || !tempCartId) {
            throw new Error("Missing some metadata");
          }

          const tempCart = await TempCart.findById(tempCartId);

          await Order.create({
            userId,
            customer: email,
            bill: bill,
            paymentIntentId: session.payment_intent,
            stripeSessionId: session.id,
            items: tempCart?.items,
            status: "paid",
          });

          await TempCart.findByIdAndDelete(tempCartId);
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    res.sendStatus(200);
  }
);
app.use(json());
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || "8000";

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running:", PORT);
});

// http://localhost:4000/stripe/webhook

//stripe listen --forward-to localhost:4000/stripe/webhook

// whsec_0cbff1b690f013ccadfd31433ac30888328ce8e6b5f3bf3443dd3365df729fa1

//stripe trigger checkout.session.completed

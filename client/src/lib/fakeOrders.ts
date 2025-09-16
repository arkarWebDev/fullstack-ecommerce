// fakeOrders.ts
import type { Order } from "../types/order";

export const FAKE_ORDERS: Order[] = [
  {
    id: "1",
    userId: "user-a",
    items: [
      {
        productId: "p01",
        name: "Denim Jacket",
        quantity: 2,
        price: 50,
        image: "/products/denim.jpg",
      },
    ],
    bill: 100,
    status: "cancelled",
    createdAt: "2025-09-15T07:05:00Z",
    updatedAt: "2025-09-15T09:00:00Z",
    customer: "Alice Smith",
  },
  {
    id: "2",
    userId: "user-b",
    items: [
      {
        productId: "p02",
        name: "Sneakers",
        quantity: 1,
        price: 80,
        image: "/products/sneakers.jpg",
      },
    ],
    bill: 80,
    status: "pending",
    createdAt: "2025-09-14T12:00:00Z",
    updatedAt: "2025-09-14T12:30:00Z",
    customer: "Bob Lee",
  },
];

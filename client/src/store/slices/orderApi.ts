// /create-order
import type { Order, OrderItem } from "@/types/order";
import { apiSlice } from "./api";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckOutSession: builder.mutation<
      { url: string },
      { items: OrderItem[]; bill: number }
    >({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
    }),
    confirmSession: builder.query<Order, string>({
      query: (session_id) => ({
        url: `/confirm-order/${session_id}`,
      }),
    }),
  }),
});

export const { useCreateCheckOutSessionMutation, useConfirmSessionQuery } =
  orderApiSlice;

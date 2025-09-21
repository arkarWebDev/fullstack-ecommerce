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
    getOrdersByUserId: builder.query<Order[], undefined>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query<Order[], undefined>({
      query: () => "/orders/all",
      providesTags: ["Order"],
    }),
    changeOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateCheckOutSessionMutation,
  useConfirmSessionQuery,
  useChangeOrderStatusMutation,
  useGetAllOrdersQuery,
  useGetOrdersByUserIdQuery,
} = orderApiSlice;

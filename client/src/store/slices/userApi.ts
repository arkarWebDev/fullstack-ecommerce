import { apiSlice } from "./api";

interface loginInput {
  email: string;
  password: string;
}

interface registerInput extends loginInput {
  name: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerInput) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: loginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userApiSlice;

import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

interface AvatarUploadInput {
  image_url: string;
}

interface EmailUpdateInput {
  email: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (data: AvatarUploadInput) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    emailUpdate: builder.mutation({
      query: (data: EmailUpdateInput) => ({
        url: "/update-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useEmailUpdateMutation,
} = userApiSlice;

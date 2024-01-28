import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthState {
  accessToken: string | undefined;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2b2-full-stack-a5-server-side-rishadislam1-two.vercel.app",
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as { auth: AuthState })?.auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["shoeData"],
  // @ts-expect-error I use this file in another file
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
});

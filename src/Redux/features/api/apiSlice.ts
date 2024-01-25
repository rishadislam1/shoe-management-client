import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder)=>({})
})
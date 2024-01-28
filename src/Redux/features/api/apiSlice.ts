import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://l2b2-full-stack-a5-server-side-rishadislam1-two.vercel.app',
        prepareHeaders: async (headers, {getState})=>{
            const token = getState()?.auth?.accessToken;
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['shoeData'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder)=>({})
})
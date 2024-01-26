import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
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
import { apiSlice } from "../api/apiSlice";

const salesApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        postSales: builder.mutation({
            query: (data)=>({
                url: '/sales',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['shoeData']
        }),
        getSales: builder.query({
            query: (email)=> `/getsales/${email}`
        })
    })
})

export const {usePostSalesMutation, useGetSalesQuery} = salesApi;
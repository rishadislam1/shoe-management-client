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
        })
    })
})

export const {usePostSalesMutation} = salesApi;
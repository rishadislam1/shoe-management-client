import { apiSlice } from "../api/apiSlice";

export const shoeApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getShoe: builder.query({
            query: ()=>'/shoe'
        }),
        addShoe: builder.mutation({
            query: (data)=>({
                url: `/addshoe`,
                method: 'POST',
                body:data
            })
        })
    })
})

export const {useGetShoeQuery, useAddShoeMutation} = shoeApi;
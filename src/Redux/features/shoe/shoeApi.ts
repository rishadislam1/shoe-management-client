import { apiSlice } from "../api/apiSlice";

export const shoeApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getShoe: builder.query({
            query: (email)=>`/shoe/${email}`,
        providesTags: ['shoeData']
        }),
        getSingleShoe: builder.query({
            query: ({email,id})=>`/singleshoe/${id}/${email}`,
            providesTags: ['shoeData']
        }),
        addShoe: builder.mutation({
            query: (data)=>({
                url: `/addshoe`,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['shoeData']
        }),
        updateShoe: builder.mutation({
            query: ({data,id})=>({
                url: `/updateshoe/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['shoeData']
        })
    })
})

export const {useGetShoeQuery, useAddShoeMutation, useGetSingleShoeQuery, useUpdateShoeMutation} = shoeApi;
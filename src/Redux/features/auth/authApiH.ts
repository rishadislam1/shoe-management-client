import { apiSlice } from "../api/apiSlice";

export const authApiH = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        register: builder.mutation({
            query: (data)=>({
                url: '/signup',
                method: "POST",
                body: data
            })
        })
    })
});

export const {useRegisterMutation} = authApiH;
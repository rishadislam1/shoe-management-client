import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApiH = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if(result?.data?.status === 'success'){
            localStorage.setItem(
                "auth",
                JSON.stringify({
                  accessToken: result.data.accessToken,
                  user: result.data.newUser,
                })
              );
    
              dispatch(
                userLoggedIn({
                    accessToken: result.data.accessToken,
                    user: result.data.user
                })
              );
          }

         
        } catch (err) {
          // nothing
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiH;

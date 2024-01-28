import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IUser {
    accessToken: string | undefined,
    user: {
        name: string,
        email: string
    } | undefined
}

const initialState:IUser = {
    accessToken: undefined,
    user: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        userLoggedIn: (state,action:PayloadAction<IUser>)=>{
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) =>{
            state.accessToken = undefined;
            state.user = undefined;
        }
    }
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;
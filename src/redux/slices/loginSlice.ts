import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type userData={
    email:string,
}

let initialState:userData={
    email:'',
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<userData>)=>{
            state.email=action.payload.email
        },
        logout:(state)=>{
            state.email=''
        }
    }
});

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
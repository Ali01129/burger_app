import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type burgerData={
    total:number,
    lettuce:number,
    bacon:number,
    cheese:number,
    meat:number

}

let initialState:burgerData={
    total:3.00,
    lettuce:0,
    bacon:0,
    cheese:0,
    meat:0
}

const burgerSlice=createSlice({
    name:"burger",
    initialState,
    reducers:{
        Increment:(state,action)=>{
            switch(action.payload.ingredient){
                case "Lettuce":{
                    console.log("hi from slice");
                    state.lettuce=state.lettuce+1;
                    state.total=state.total+0.50;
                    state.total=Number(state.total.toFixed(2));
                    break;
                }
                case "Bacon":{
                    state.bacon=state.bacon+1;
                    state.total=state.total+0.70;
                    state.total=Number(state.total.toFixed(2));
                    break;
                }
                case "Cheese":{
                    state.cheese=state.cheese+1;
                    state.total=state.total+0.40;
                    state.total=Number(state.total.toFixed(2));
                    break;
                }
                case "Meat":{
                    state.meat=state.meat+1;
                    state.total=state.total+1.30;
                    state.total=Number(state.total.toFixed(2));
                    break;
                }
                default:{
                    break;
                }
            }
        },
        Decrement:(state,action)=>{
            switch(action.payload.ingredient){
                case "Lettuce":{
                    if(state.lettuce>0){
                        state.lettuce=state.lettuce-1;
                        state.total=state.total-0.50;
                        state.total=Number(state.total.toFixed(2));
                    }
                    break;
                }
                case "Bacon":{
                    if(state.bacon>0){
                        state.bacon=state.bacon-1;
                        state.total=state.total-0.70;
                        state.total=Number(state.total.toFixed(2));
                    }
                    break;
                }
                case "Cheese":{
                    if(state.cheese>0){
                        state.cheese=state.cheese-1;
                        state.total=state.total-0.40;
                        state.total=Number(state.total.toFixed(2));
                    }
                    break;
                }
                case "Meat":{
                    if(state.meat>0){
                        state.meat=state.meat-1;
                        state.total=state.total-1.30;
                        state.total=Number(state.total.toFixed(2));
                    }
                    break;
                }
                default:{
                    break;
                }
            }
        },
        Clear:(state)=>{
            state.total=3.00,
            state.lettuce=0,
            state.bacon=0,
            state.cheese=0,
            state.meat=0 
        }
    }
});

export const {Increment,Decrement,Clear} = burgerSlice.actions;
export default burgerSlice.reducer;
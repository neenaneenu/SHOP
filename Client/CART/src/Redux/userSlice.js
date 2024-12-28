import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        username: "",
        email: "",
        password: ""
    },
    reducers:{
        createUser :(state, action)=>{
            state.id = action.payload._id
            state.name = action.payload.name
            state.username = action.payload.username
            state.email = action.payload.email
            state.password = action.payload.password
        },
        logoutUser :(state)=>{
            state.id= ""
            state.name= ""
            state.username=""
            state.email=""
            state.password=""

        }
    }
    
    
})
export const {createUser, logoutUser} = userSlice.actions
export const {reducer: userReducer} = userSlice
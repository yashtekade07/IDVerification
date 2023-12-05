import {configureStore} from "@reduxjs/toolkit";
import { userReducer ,} from "./reducers/userReducer.js";
import { historyReducer } from "./reducers/historyReducer.js";

const store=configureStore({
    reducer:{
        user:userReducer,
        history:historyReducer

    }, 
})

export default store;

export const server="http://localhost:4000/api"
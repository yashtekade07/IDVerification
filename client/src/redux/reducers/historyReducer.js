import {createReducer} from "@reduxjs/toolkit"

export const historyReducer=createReducer({},{
    getHistoryRequest:(state)=>{
        state.loading=true;
    },
    getHistorySuccess:(state,action)=>{
        state.loading=false;
        state.history=action.payload;
        state.message=action.payload.message;
    },
    getHistoryFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    }

});

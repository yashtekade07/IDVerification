import {createReducer} from "@reduxjs/toolkit"

export const userReducer=createReducer({},{
    getRequest:(state)=>{
        state.loading=true;
    },
    getSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.message=action.payload.message;
    },
    getFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    updateProfileRequest:(state)=>{
        state.loading=true;
    },
    updateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    updateProfileFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    
    deleteProfileRequest:(state)=>{
        state.loading=true;
    },
    deleteProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteProfileFail:(state,action)=>{
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
export const profileReducer=createReducer({},{
    postRequest:(state)=>{
        state.loading=true;
    },
    postSuccess:(state,action)=>{
        state.loading=false;
        state.profile=action.payload.user;
        state.message=action.payload.message;
    },
    postFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
});

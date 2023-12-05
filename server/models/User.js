import mongoose from "mongoose";

const Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    'identification_number':{
        type:String,
        required:true,
        unique:true
    },
    'date-of-birth' :{
        type:Date,
    },
    'date-of-issue':{
        type:Date,
    },
    'date-of-expiry':{
        type:Date,
    },
    timestamps:true
});
Schema.index({name: 1 , last_name : 1}, {unique: true});
export const User=mongoose.model("User",Schema);
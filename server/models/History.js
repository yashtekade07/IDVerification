import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    success:{
        type:Boolean,
    },
    message:{
        type:String
    },
    request:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    'identification_number':{
        type:String,
        required:true,
    },
    'date-of-birth' :{
        type:Date,
    },
    'date-of-issue':{
        type:Date,
    },
    'date-of-expiry':{
        type:Date,
    }

})
export const History=mongoose.model("History",Schema);
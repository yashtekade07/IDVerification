import {catchAsyncError} from "../middleware/catchAsyncError.js"
import ErrorHandler  from "../utils/errorHandler.js";
import {User} from "../models/User.js";
import { History } from "../models/History.js";
export const getUser = catchAsyncError(async(req,res,next)=>{
    const identification_number=req.query.identification_number || "";
    const name=req.query.name || "";
    const last_name=req.query.last_name || "";
    const date_of_birth=req.query.date_of_birth || "";
    const date_of_issue=req.query.date_of_issue || "";
    const date_of_expiry=req.query.date_of_expiry || "";
    const user= await User.find({
        identification_number:{
            $regex:identification_number,
            $options:"i", 
        },
        name:{
            $regex:name,
            $options:"i",
        },
        last_name:{
            $regex:last_name,
            $options:"i",
        },
        // 'date-of-birth':{
        //     $regex:date_of_birth,
        // },
        // 'date-of-issue':{
        //     $regex:date_of_issue,
        // },
        // 'date-of-expiry':{
        //     $regex:date_of_expiry,
        // }
    })
    if(user.length===0){
        await History.create({
            success:false,
            message:"User does not exist",
            request:"GET",
            identification_number,
            name,
            last_name
        })
        return res.status(404).json({
            success:false,
            message:"User does not exist",
        });
    }
    else{
        await History.create({
            success:true,
            message:"User fetched successfully",
            request:"GET",
            identification_number,
            name,
            last_name
        })
        return res.status(200).json({
            success:true,
            message:"User Fetched Successfully",
            user,
        });
    }
})

export const registerUser = catchAsyncError(async(req,res,next)=>{
    const {identification_number,name,last_name} = req.body;
    const date_of_birth = req.body['date-of-birth'];
    const date_of_issue = req.body['date-of-issue'];
    const date_of_expiry= req.body['date-of-expiry'];

    let user = await User.findOne({identification_number});
    if(user) {
        await History.create({
            success:true,
            message:"User already exist",
            request:"POST",
            identification_number,
            name,
            last_name,
            "date-of-birth":user['date-of-birth'],
            "date-of-issue":user["date-of-issue"],
            "date-of-expiry":user["date-of-expiry"],
        })
        return res.status(201).json({
            success:true, 
            message:"User already exist",
            user,
        })
    }
        

    user = await User.create({
        identification_number,
        name,
        last_name,
        "date-of-birth":date_of_birth,
        "date-of-issue":date_of_issue,
        "date-of-expiry":date_of_expiry,
    });
    await History.create({
        success:true,
        message:"User Registered successfully",
        request:"POST",
        identification_number,
        name,
        last_name,
        "date-of-birth":date_of_birth,
        "date-of-issue":date_of_issue,
        "date-of-expiry":date_of_expiry,
    })
    return res.status(201).json({
        success:true,
        user,
        message:"user created successfully"
    });

});

export const updateUser = catchAsyncError(async(req,res,next)=>{
    const {identification_number,new_id,name,last_name}=req.body;
    const date_of_birth = req.body['date-of-birth'];
    const date_of_issue = req.body['date-of-issue'];
    const date_of_expiry= req.body['date-of-expiry'];
    const user = await User.findOne({identification_number});
    if(!user) {
        await History.create({
            success:false,
            message:"User doest exist",
            request:"PUT",
            identification_number,
        })
        return next(new ErrorHandler("User does not exist",404));
    }

    if(new_id) user.identification_number=new_id;
    if(name) user.name=name;
    if(last_name) user.last_name=last_name;
    if(date_of_birth) user["date-of-birth"]=date_of_birth;
    if(date_of_issue) user["date-of-issue"]=date_of_issue;
    if(date_of_expiry) user["date-of-expiry"]=date_of_expiry;

    await user.save();
    await History.create({
        success:true,
        message:"User Updated successfully",
        request:"PUT",
        identification_number,
        name,
        last_name,
        "date-of-birth":date_of_birth,
        "date-of-issue":date_of_issue,
        "date-of-expiry":date_of_expiry,
    })
    return res.status(200).json({
        success:true,
        user, 
        message:"Profile Updated Successfully",
    })

});

export const deleteUser = catchAsyncError(async(req,res,next)=>{
    const {identification_number}=req.body;
    const user= await User.findOne({identification_number});

    if(!user) 
    {
        await History.create({
            success:false,
            message:"User does not exist ",
            request:"Delete",
            identification_number,
        })
        return next(new ErrorHandler("User not found",404));
    }
    else{

        await History.create({
            success:true,
            message:"User Deleted successfully",
            request:"DELETE",
            identification_number,
            name:user.name,
            last_name:user.last_name,
            "date-of-birth":user["date-of-birth"],
            "date-of-issue":user["date-of-issue"],
            "date-of-expiry":user["date-of-expiry"],
        })
        await user.deleteOne();
        return res.status(200).json({
            success:true,   
            message:"User Deleted Succesfully",
        })
    }

})
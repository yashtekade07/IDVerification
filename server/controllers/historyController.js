import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { History } from "../models/History.js";
const getHistory = catchAsyncError(async(req,res,next)=>{
    const identification_number=req.query.identification_number || "";
    const name=req.query.name || "";
    const last_name=req.query.last_name || "";
    const history= await History.find({
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
        }
    })
    return res.status(200).json({
        success:true,
        message:"History Fetched Successfully",
        history,
    });
})

export default getHistory
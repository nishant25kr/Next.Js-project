import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isVerfied:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:String,
    verifyToken:String,
    verifyTokenExpiry:Date

},{timeStamp:true})

const User = mongoose.model.users || mongoose.model("User",userSchema);

export default User;
import mongoose,{ Document } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema : mongoose.Schema<Message> = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now,
    }
},{timestamps:true})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified: boolean;
    isAcceptingMessages:boolean;
    message: Message[]

}

const UserSchema: mongoose.Schema<User>  = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type: String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,"Plese use valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    message:[]


},{timestamps:true})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;
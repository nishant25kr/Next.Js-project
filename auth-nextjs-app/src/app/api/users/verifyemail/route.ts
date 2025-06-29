import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function POST(request:NextRequest) {
    try {

        const reqbody = await request.json();
        const {token} = reqbody
        console.log(token)

        const user = await  User.findOne({verifyToken:token},{verifyTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json(
                {message:'User not found'},
                {status:500}
            )
        }
        console.log(user)

        user.isverified = true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;

        await user.save();

        return NextResponse.json(
            {
                message:"user verified successfully",
                success:true
            }
        )

        

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status:500}
        )
    }
}
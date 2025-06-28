
import { Connect } from "@/dbConfig/dbConfig"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

Connect()

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();
        const {email, password} = reqbody;
        console.log(reqbody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error:"User doesn't exist"},
                {status:400}
            )
        }

        const validPassword = bcrypt.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid password"},
                {status:400}
            )
        }

        //create token data
        const tokenData = {
            id : user._id,
            username: user.username,
            email: user.email
        }

        //crate Token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json(
            {
                message: "Login successful",
                success:true
            }
        )

        response.cookies.set("token",token,{httpOnly:true})

        return response;



        
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}


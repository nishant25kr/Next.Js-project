import { Connect } from "@/dbConfig/dbConfig"
import User from "@models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs"


Connect()

export async function POST(request:NextRequest){
    try {

        const reqbody = await request.json()
        const {username,email,password} = reqbody
        console.log(reqbody)
        await User.findOne({email})
        


    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status:500},
        )
    }
}




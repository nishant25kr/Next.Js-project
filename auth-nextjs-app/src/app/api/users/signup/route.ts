import { Connect } from "@/dbConfig/dbConfig"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"


Connect()

export async function POST(request: NextRequest) {
    try {

        const reqbody = await request.json()
        const { username, email, password } = reqbody
        console.log(reqbody)
        const existUser = await User.findOne({ email })

        if (existUser) {
            return NextResponse.json(
                { error: "User alredy exist" },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        if(!savedUser){
            return NextResponse.json(
                {error:"Error while saving User to database"},
                {status:400}
            )
        }

        console.log(savedUser);

        return NextResponse.json(
            {message:"User created successfully"},
            {status:200}
        )
        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        )
    }
}




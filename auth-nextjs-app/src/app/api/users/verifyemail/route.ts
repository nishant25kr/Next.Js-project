import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function POST(request: NextRequest) {
    try {

        const reqbody = await request.json();
        const { token } = reqbody
        console.log(token)
        console.log("h1")

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        console.log("h2")

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 500 }
            )
        }

        console.log("h2")


        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        console.log("h3")

        await user.save();
        console.log("h4")
        return NextResponse.json(
            {
                message: "user verified successfully",
                success: true
            }
        )



    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
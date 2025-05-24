import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod/v4";

export async function POST(request: Request){
    await dbconnect()

    try {
        const {username,email,password} = await request.json()

    } catch (error) {
        console.log("Error registring User",error)
        return Response.json(
            {
                success:false,
                message:"Error in registring registring"
            },
            {
                status: 500
            }

        )
    }
}
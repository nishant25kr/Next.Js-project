import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod/v4";

export async function POST(request: Request) {
    await dbconnect()

    try {
        const { username, email, password } = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: true,
                message: "username is already taken"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const varifyCode = Math.floor(100000 + Math.random() * 900000).toString()


        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already with this email"
                }, { status: 400 })
            }else{
                const hashedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = varifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() +  3600000) 

                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const expiryData = new Date()
            expiryData.setHours(expiryData.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: varifyCode,
                verifyCodeExpiry: expiryData,
                isVerified: false,
                isAcceptingMessages: true,
                message: []
            })

            await newUser.save()
        }

        // console.log(email+" "+username+" "+varifyCode)

        //send varification code 
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            varifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registered successfully"
        }, { status: 201 })


    } catch (error) {
        console.log("Error registring User", error)
        return Response.json(
            {
                success: false,
                message: "Error in registring registring"
            },
            {
                status: 500
            }

        )
    }
}
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { success } from "zod/v4";

export async function POST(request: Request) {

    await dbconnect()

    try {

        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not find"
                },
                { status: 500 }
            )
        }

        const iscodeValid = user.verifyCode === code
        const iscodeExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (iscodeExpired && iscodeValid) {
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "user is verified"
                },
                { status: 500 }
            )

        }
        else{
            return Response.json(
                {
                    success: false,
                    message: "user not find"
                },
                { status: 500 }
            )

        }

        



    } catch (error) {
        console.log("Error in varifying code", error)
        return Response.json(
            {
                success: false,
                message: "Error in verifying user"
            },
            { status: 500 }
        )
    }

}
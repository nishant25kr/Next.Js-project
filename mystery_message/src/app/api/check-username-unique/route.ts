import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";
import { url } from "inspector";
import { success } from "zod/v4";

const UsernameQuerySchema = z.object({
    username: usernameValidation
    
})

export async function GET(request: Request){
    await dbconnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username : searchParams.get('username') 
        }

        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result)

        if(!result.success){
            const usernameError = result.error.format().
            username?._errors || []
            return Response.json(
                {
                    success:false,
                    message: "Invalid query parameter"
                },
                { status:400 }
            )
        }

        const { username } = result.data 

        const existingVerifiedUser = await UserModel.findOne({username,isVerified:true})

        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                {status: 400}
            )
        }

        return Response.json(
                {
                    success: true,
                    message: "Username is available"
                },
                {status: 200}
            )


    } catch (error) {
        console.log("Error in checking username",error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },
            {
                status: 500
            }
        )
    }

}

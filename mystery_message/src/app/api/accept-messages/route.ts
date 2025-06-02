import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";

export async function POST(request: Request){

    await dbconnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not authonticated"
            },
            {status:400}
        )
    }

    const userId = user._id
    const {accecptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:true},
            {new:true}
        )

        if(!updatedUser){
            return Response.json(
            {
                success: false,
                message: "failed to update user status "
            },
            {status: 401}
        )
        }

        return Response.json(
            {
                success: true,
                message: "Message accecpting state successfully"
            },
            {status: 200}
        )

        
    } catch (error) {
        console.log("failed to update user status to accecpt messages",error)
        return Response.json(
            {
                success: false,
                message: "failed to update user status to accecpt messages"
            },
            {status: 500}
        )
    }


}
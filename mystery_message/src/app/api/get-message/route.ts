import dbconnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/User.model";

export async function GET(request: Request) {
    await dbconnect()
    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !user) {
        return Response.json(
            {
                session: false,
                message: "Not authonticate"
            },
            { status: 400 }
        )
    }

    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'message.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                    session: false,
                    message: "Not authonticate"
                },
                { status: 400 }
            )
        }

        return Response.json(
                {
                    session: true,
                    message: user[0].message
                },
                { status: 200 }
            )

    } catch (error) {

    }





}
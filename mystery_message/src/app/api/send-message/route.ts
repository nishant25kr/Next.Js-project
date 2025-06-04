import dbconnect from "@/lib/dbConnect"
import UserModel from "@/models/User.model"
import { Message } from "@/models/User.model"
import { success } from "zod/v4"

export async function POST(request: Request) {
    await dbconnect()

    const { username, content } = await request.json()

    try {
        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found"
                },
                {
                    status: 404
                }
            )
        }

        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: "user is not accepting messages"
                },
                {
                    status: 403
                }
            )
        }

        const newMessage = { content, createdAt: new Date() }
        user.message.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "Message sent successfull"
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error adding message:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }

}


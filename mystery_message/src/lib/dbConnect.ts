import { promises } from "dns"
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {

}

async function dbconnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database is already cnnected");
        return;
    }

    try {
        const DB = await mongoose.connect(process.env.MONGODB_URL || "", {})

        connection.isConnected = DB.connections[0].readyState

        console.log(DB)
        console.log(DB.connection)

        console.log("DB connected successfully")

    } catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }

}

export default dbconnect

import mongoose from "mongoose";

export async function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected")
        })
        connection.on('error', (err)=> {
            console.log("Error while connecting with DB",err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something Went Wrong:",error)
        
    }
}
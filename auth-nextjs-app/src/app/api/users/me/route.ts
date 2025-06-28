import { Connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";



// export async function GET(request:NextRequest){

//     try {

//         await Connect()
//         const userID =  getDataFromToken(request);



//         const user = await User.findOne({_id:userID}).select("-password")

//         return NextResponse.json(
//             {message:"user found",data:user}
//         )

//     } catch (error:any) {
//         return NextResponse.json(
//             {error:error.message},
//             {status:400}
//         )
//     }

// }

export async function GET(request: NextRequest) {
  try {
    await Connect();
    const token = request.cookies.get("token")?.value;
    console.log("Token from cookie:", token); // ✅ check this
    const userID = await getDataFromToken(request);

    const user = await User.findOne({ _id: userID }).select("-password");
    console.log("User from DB:", user); // ✅ check this

    return NextResponse.json({ message: "user found", data: user });
  } catch (error: any) {
    console.error("GET /api/users/me error:", error.message); // ✅ important
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.username },
              { username: credentials.username },
            ],
          });

          if (!user) {
            throw new Error("No user found with this username or email.");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first.");
          }

          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (passwordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password.");
          }
        } catch (error: any) {
          throw new Error(error.message || "Authentication error");
        }
      },
    }),
  ],
};

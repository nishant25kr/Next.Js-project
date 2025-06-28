"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import User from "@/models/user"; // adjust the path as needed
import { Connect } from "@/dbConfig/dbConfig";

await Connect()


export default function Login() {
  const router = useRouter()

  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled,setbuttonDisabled] = React.useState(false)
  const [loding,setloding] = React.useState(false)

  const onLogin = async () => {

    try {
      setloding(true)
      const response  = await axios.post("/api/users/login",user);
      console.log(response)
      router.push("/profile")
      


    } catch (error:any) {

      console.log("Login failed",error.message);
      toast.error(error.message);

    }finally{
      setbuttonDisabled(false)
    }

  };

  useEffect (() => {
    if(user.email.length>0 && user.password.length>0){
      setbuttonDisabled(false);
    }else{
      setbuttonDisabled(true);
    }
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {loding ? "Processing":"Login"}
        </h1>
        <hr className="mb-6 border-gray-300" />


        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        <button onClick={onLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          Login
        </button>

        <Link href="/signup" className="text-black">SignUp</Link>
      </div>
    </div>
  );
}

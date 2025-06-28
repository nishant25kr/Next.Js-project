"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setbuttonDisabled] = React.useState(false);

  const [loding, setloding] = React.useState(false);

  const onSignUp = async () => {
    try {
      setloding(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp success",response.data);
      router.push("/login")
      
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
      
    } finally {
      setloding(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {loding ? "Processing " : "SignUp"}
        </h1>
        <hr className="mb-6 border-gray-300" />

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />
        </div>

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

        <button
          onClick={onSignUp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {buttonDisabled ? "No signup" : "SignUp"}
        </button>
        <Link href="/login" className="text-black">
          Login Page
        </Link>
      </div>
    </div>
  );
}

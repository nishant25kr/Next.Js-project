"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();

  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  };

  const getUserDetail = async () => {
    try {
    const response = await axios.get("/api/users/me", { withCredentials: true });
    const user = response.data.data;

    if (!user) {
      toast.error("No user data returned");
      return;
    }

    setData(user._id);
  } catch (error: any) {
    console.error("Failed to fetch user", error);
    toast.error(error.response?.data?.error || "Failed to fetch user");
  }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Profile Page</h1>

      {/* ✅ Conditional rendering corrected */}
      {data ? (
        <Link
          href={`/profile/${data}`}
          className="mb-4 text-blue-700 underline"
        >
          View Full Profile ({data})
        </Link>
      ) : (
        <p className="mb-4 text-gray-600">No user data</p>
      )}

      <hr className="mb-6 border-gray-300 w-full max-w-md" />

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 mb-4 rounded-lg transition duration-200 shadow-md"
      >
        Logout
      </button>

      <button
        onClick={getUserDetail}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md"
      >
        Get User Data
      </button>
    </section>
  );
}

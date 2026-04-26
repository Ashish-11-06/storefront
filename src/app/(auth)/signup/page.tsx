"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "@/graphql/queries/authQueries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      router.push("/login");
    },
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await registerUser({
        variables: {
          ...form,
          role: "customer",
        },
      });

      toast.success("Account created successfully");

      setTimeout(() => {
        router.push("/login");
      }, 1200);

    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE (IMAGE) */}
      <div className="hidden lg:block relative">
        <Image
          src="/flower-signup-page2.avif"
          alt="Flowers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-xs"></div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center px-6 lg:px-20 bg-[#f6f4f1]">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Create account
          </h1>

          <p className="text-gray-500 mb-8">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  className="px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-gray-400"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  className="px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-gray-400"
                />
              </div>

            </div>
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-gray-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone <span className="text-red-500">*</span></label>
              <input
                name="phone"
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-gray-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6b6653] text-white rounded-md hover:opacity-90 transition"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-50">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </button>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 mt-4 text-center">
              {error.message}
            </p>
          )}

          {/* Login */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
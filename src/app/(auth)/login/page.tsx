"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "@/graphql/queries/authQueries";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        variables: {
          email: form.email,
          password: form.password,
        },
      });

      const token = (res.data as any)?.tokenAuth?.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");

        toast.success("Welcome back!");

        setTimeout(() => {
          router.push(redirect);
        }, 800);
      } else {
        toast.error("Invalid email or password");
      }

    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE (FORM) */}
      <div className="flex items-center justify-center px-6 lg:px-20 bg-[#f6f4f1]">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome back
          </h1>

          <p className="text-gray-500 mb-8">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            {/* Forgot */}
            <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
              Forgot password?
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6b6653] text-white rounded-md hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
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
            Sign in with Google
          </button>

          {/* Signup */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-black font-medium hover:underline">
              Sign up for free
            </Link>
          </p>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 mt-4 text-center">
              Invalid email or password
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="hidden lg:block relative">
        <Image
          src="/flower-login-page2.avif" // replace with your roses image
          alt="Flowers"
          fill
          className="object-cover"
          priority
        />

        {/* Optional overlay for blur effect */}
        <div className="absolute inset-0 backdrop-blur-xs"></div>
      </div>

    </div>
  );
}
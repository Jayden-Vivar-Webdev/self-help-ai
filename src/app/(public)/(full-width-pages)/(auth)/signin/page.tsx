"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/app/(firebaseAuth)/firebaseSignIn";
import Link from "next/link";
import GoogleLogin from "@/app/components/loginButtons/google";
import GithubLogin from "@/app/components/loginButtons/github";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleSignIn(email, password /* , rememberMe if supported */);
      router.push("/dashboard");
    } catch (error) {
      alert(
        "Sign In failed: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Not a member?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-500">
                Start a 14 day free trial
              </Link>
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="group relative w-full flex justify-center py-2 px-4 border bg-black text-sm font-medium rounded-md text-white hover:bg-[#000000d4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <GoogleLogin />
              <GithubLogin />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black to-[#000000d1] bg-cover bg-center">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white p-8">
              <div className="mb-8">
                <div className="w-64 h-48 mx-auto bg-opacity-10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <img className="filter invert" src="/images/logo.png" alt="Nexia Logo" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Welcome To Nexia - Powered By Nexa Web</h3>
              <p className="text-lg opacity-90">
                Sign in to access your personalised dashboard and continue your journey with your Nexian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

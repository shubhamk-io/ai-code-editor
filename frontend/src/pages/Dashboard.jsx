import React, { useState } from "react";
import { signInWithPopup } from 'firebase/auth'
import {
  FcGoogle,
} from "react-icons/fc";
import { FiShield, FiCheck, } from "react-icons/fi";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login";


const Dashboard = () => {

  const [loading, setLoading] = useState(false)

  // Firebase Google login here
  const handleGoogleLogin = async () => {
    setLoading(true);
    const userData = await signInWithPopup(auth, googleProvider)
    console.log(userData)


    // Get Token from user data
    const token = await userData.user.getIdToken();
    setLoading(false)
    const data = await login(token)


  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">

            {/* Wofex Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-xl font-bold">
                W
              </span>
            </div>

            <span className="text-2xl font-semibold tracking-tight">
              Wofex
              <span className="text-indigo-400">
                {" "}AI
              </span>
            </span>

          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101116]/90 backdrop-blur-xl p-8 shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome
            </h1>

            <p className="mt-3 text-sm text-gray-400 leading-6">
              Sign in and access your project
              <br />
              and start building.
            </p>

          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
              bg-white
              text-gray-900
              font-medium
              flex
              items-center
              justify-center
              gap-3
              transition-all
              duration-200
              hover:bg-gray-100
              hover:shadow-lg
              active:scale-[0.98]
            "
          >

            <FcGoogle size={22} />

            <span>
              {loading ?" Sing in.... ":  "Continue with Google"}
            </span>

          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-white/10 flex-1" />

            <span className="text-[10px] tracking-widest text-gray-500">
              SECURE ACCESS
            </span>

            <div className="h-px bg-white/10 flex-1" />

          </div>

          {/* Security Box */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">

            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <FiShield size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-200">
                Your projects stay secure
              </p>

              <p className="text-xs text-gray-500 mt-1 leading-5">
                Your account is protected with secure
                authentication.
              </p>
            </div>

            <FiCheck
              size={16}
              className="ml-auto text-green-400 mt-1"
            />

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">

          By continuing, you agree to our{" "}

          <span className="text-gray-400 hover:text-white cursor-pointer">
            Terms
          </span>

          {" "}and{" "}

          <span className="text-gray-400 hover:text-white cursor-pointer">
            Privacy Policy
          </span>

          .

        </p>

      </div>

    </div>
  );
};



export default Dashboard
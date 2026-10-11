import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FiShield, FiCheck, FiSun, FiMoon } from "react-icons/fi";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import NavBar from "../components/NavBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { isDark, toggleTheme } = useTheme();

  // Firebase Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const token = await userCredential.user.getIdToken();
      const data = await login(token);
      if (data) {
        dispatch(setUserData(data));
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── 1. Login Screen (when not authenticated) ──────────────────────────
  if (!userData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: "var(--app-bg)",
          color: "var(--primary-text)",
        }}
      >
        {/* Floating Theme Toggle (top-right) */}
        <div className="absolute top-5 right-6 z-20">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-none cursor-pointer"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--muted-icon)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary-text)";
              e.currentTarget.style.filter = "brightness(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted-icon)";
              e.currentTarget.style.filter = "none";
            }}
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px]" />
        </div>

        {/* Main Login Card Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: "var(--accent-color)" }}
              >
                W
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Worfes
                <span style={{ color: "var(--accent-color)" }}> .AI</span>
              </span>
            </div>
          </div>

          {/* Login Card */}
          <div
            className="rounded-2xl p-8 transition-colors duration-200"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              boxShadow: isDark
                ? "0 20px 40px -15px rgba(0, 0, 0, 0.7)"
                : "0 20px 40px -15px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
              <p
                className="mt-2 text-sm leading-6"
                style={{ color: "var(--secondary-text)" }}
              >
                Sign in to access your projects and start coding.
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer active:scale-[0.98]"
              style={{
                backgroundColor: isDark ? "#FFFFFF" : "#FFFFFF",
                color: "#111827",
                border: isDark ? "none" : "1px solid var(--border-color)",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? "#F3F4F6"
                  : "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
            >
              <FcGoogle size={22} />
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "var(--border-color)" }}
              />
              <span
                className="text-[10px] tracking-widest font-semibold uppercase"
                style={{ color: "var(--secondary-text)" }}
              >
                SECURE ACCESS
              </span>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "var(--border-color)" }}
              />
            </div>

            {/* Security Box */}
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl transition-colors duration-200"
              style={{
                backgroundColor: "var(--hover-bg)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                  color: "var(--accent-color)",
                }}
              >
                <FiShield size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold">Your projects stay secure</p>
                <p
                  className="text-[11px] mt-0.5 leading-4"
                  style={{ color: "var(--secondary-text)" }}
                >
                  Your account is protected with enterprise-grade token security.
                </p>
              </div>
              <FiCheck size={16} className="ml-auto text-emerald-500 mt-0.5 shrink-0" />
            </div>
          </div>

          {/* Footer Terms */}
          <p
            className="text-center text-xs mt-6"
            style={{ color: "var(--secondary-text)" }}
          >
            By continuing, you agree to our{" "}
            <span
              className="underline cursor-pointer"
              style={{ color: "var(--primary-text)" }}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              className="underline cursor-pointer"
              style={{ color: "var(--primary-text)" }}
            >
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  // ── 2. Authenticated Dashboard ─────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: "var(--app-bg)",
        color: "var(--primary-text)",
      }}
    >
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

     
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
                YOUR WORKSPACE
              </p>

              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Welcome back,
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
                  {userData?.name?.split(" ")[0] || "User"}
                </span>
                <span
                  className="inline-block origin-bottom-right"
                  role="img"
                  aria-label="waving hand"
                >
                  👋
                </span>
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Ready to build something amazing today?
              </p>
            </div>
          </div>
        </main>



      </div>
    </div>
  );
};

export default Dashboard;
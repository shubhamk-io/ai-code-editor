import React, { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../features/logout";

const NavBar = () => {
  const dispatch = useDispatch();

  // ── Theme ──────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((p) => !p);

  // ── Dropdown ───────────────────────────────────────────────
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── User data from Redux ───────────────────────────────────
  const { userData } = useSelector((state) => state.user);

  const initial = userData?.name
    ? userData.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : null;

  // ── Logout ─────────────────────────────────────────────────
  // 1. Backend: DELETE Redis session + clear cookie  → logout()
  // 2. Firebase: sign out                            → signOut(auth)
  // 3. Redux: clear userData                         → dispatch(setUserData(null))
  const handleLogout = async () => {
    try {
      await logout();                  // POST /api/auth/logout
      await signOut(auth);             // Firebase sign out
      dispatch(setUserData(null));     // Clear Redux → redirects to login
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ── Styles ─────────────────────────────────────────────────
  const navStyle = isDark
    ? {
        background: "linear-gradient(180deg, rgba(10,20,60,0.97) 0%, rgba(6,13,31,0.98) 100%)",
        borderColor: "rgba(59,130,246,0.2)",
        boxShadow: "0 4px 32px rgba(30,80,255,0.10), inset 0 1px 0 rgba(100,160,255,0.10)",
      }
    : {
        background: "linear-gradient(180deg, rgba(240,245,255,0.98) 0%, rgba(255,255,255,0.99) 100%)",
        borderColor: "rgba(203,213,225,0.8)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      };

  const pillStyle = isDark
    ? {
        background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.15))",
        border: "1px solid rgba(99,102,241,0.25)",
        boxShadow: "0 0 16px rgba(99,102,241,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
      }
    : {
        background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(148,163,184,0.12))",
        border: "1px solid rgba(148,163,184,0.30)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      };

  const dropdownStyle = {
    background: isDark
      ? "linear-gradient(160deg, rgba(15,20,55,0.98), rgba(8,12,30,0.99))"
      : "linear-gradient(160deg, rgba(248,250,255,0.99), #fff)",
    border: isDark ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(203,213,225,0.8)",
    boxShadow: isDark
      ? "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(99,102,241,0.15)"
      : "0 8px 32px rgba(0,0,0,0.12)",
    animation: "dropdownIn 0.18s cubic-bezier(0.16,1,0.3,1) both",
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      <nav
        className="w-full sticky top-0 z-50 px-5 sm:px-8 py-3 flex items-center justify-between backdrop-blur-xl border-b transition-all duration-300"
        style={navStyle}
      >
        {/* LEFT — Brand */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-[22px] font-black tracking-[-0.03em] leading-none transition-colors duration-300"
            style={{ color: isDark ? "#fff" : "#0f172a" }}
          >
            Worfes
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm leading-none">
            .AI
          </span>
        </div>

        {/* RIGHT — Avatar + Sun/Moon */}
        <div className="flex items-center gap-3">

          {/* Avatar — only when logged in */}
          {initial && (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar circle — click to open dropdown */}
              <div
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer select-none transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: "#fff",
                  boxShadow: dropdownOpen
                    ? "0 0 0 3px rgba(99,102,241,0.45)"
                    : "0 0 0 2px rgba(99,102,241,0.2)",
                }}
              >
                {initial}
              </div>

              {/* Dropdown popup */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                  style={dropdownStyle}
                >
                  {/* User info */}
                  <div
                    className="px-4 py-3 border-b"
                    style={{ borderColor: isDark ? "rgba(99,102,241,0.15)" : "rgba(203,213,225,0.6)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff" }}
                      >
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: isDark ? "#fff" : "#0f172a" }}>
                          {userData?.name}
                        </p>
                        <p className="text-[11px] truncate" style={{ color: isDark ? "rgba(148,163,184,0.8)" : "#64748b" }}>
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout button */}
                  <div className="p-1.5">
                    <button
                      onClick={handleLogout}   // ← LOGOUT CALLED HERE
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                      style={{ color: "#ef4444" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDark ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.08)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <FiLogOut size={14} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sun / Moon toggle inside blurry pill */}
          <div
            className="flex items-center justify-center rounded-full p-[3px] transition-all duration-300"
            style={pillStyle}
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none active:scale-90"
              style={{ color: isDark ? "#fde047" : "#4f46e5" }}
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>

        </div>
      </nav>

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default NavBar;

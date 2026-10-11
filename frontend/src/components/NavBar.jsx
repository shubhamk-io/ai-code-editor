import React, { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../features/logout";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

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
    ? userData.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : null;

  // ── Logout ─────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await logout();
      await signOut(auth);
      dispatch(setUserData(null));
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <nav
        className="w-full sticky top-0 z-50 h-14 px-4 sm:px-6 flex items-center justify-between select-none transition-colors duration-200"
        style={{
          backgroundColor: "var(--navbar-bg)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* LEFT — Brand */}
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-bold tracking-tight transition-colors duration-200"
            style={{ color: "var(--primary-text)" }}
          >
            Worfes
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors duration-200"
            style={{
              backgroundColor: "var(--hover-bg)",
              color: "var(--accent-color)",
              border: "1px solid var(--border-color)",
            }}
          >
            .AI
          </span>
        </div>

        {/* RIGHT — Controls (Theme toggle & Profile) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150 focus:outline-none cursor-pointer"
            style={{
              backgroundColor: "var(--hover-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--muted-icon)",
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
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          {/* Avatar & Dropdown */}
          {initial && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                aria-label="User menu"
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors duration-150 focus:outline-none"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "#FFFFFF",
                  border: dropdownOpen
                    ? "2px solid var(--accent-color)"
                    : "1px solid var(--border-color)",
                }}
              >
                {initial}
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-lg overflow-hidden z-50 transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--navbar-bg)",
                    border: "1px solid var(--border-color)",
                    boxShadow: isDark
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    animation: "dropdownFadeIn 0.15s ease-out both",
                  }}
                >
                  {/* User info */}
                  <div
                    className="px-3.5 py-3"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <p
                      className="text-xs font-semibold truncate"
                      style={{ color: "var(--primary-text)" }}
                    >
                      {userData?.name}
                    </p>
                    <p
                      className="text-[11px] truncate mt-0.5"
                      style={{ color: "var(--secondary-text)" }}
                    >
                      {userData?.email}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors duration-150 cursor-pointer"
                      style={{
                        color: "#EF4444",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(239, 68, 68, 0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <FiLogOut size={14} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default NavBar;

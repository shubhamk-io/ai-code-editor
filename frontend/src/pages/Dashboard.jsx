import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import {
  FiShield,
  FiCheck,
  FiSun,
  FiMoon,
  FiStar,
  FiFolder,
  FiTrash2,
  FiClock,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import NavBar from "../components/NavBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useTheme } from "../context/ThemeContext";
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState("project")
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { projects = [], starredProjects = [] } = useSelector((state) => state.projects || {});
  const { isDark, toggleTheme } = useTheme();

  const [projectsLoading, setProjectsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const displayedProjects = activeSession === "starred" ? (starredProjects || []) : (projects || []);

  const handleCreateProject = async (e) => {
    e?.preventDefault();
  };

  const handleToggleStar = (e, id) => {
    e?.stopPropagation();
  };

  const handleDeleteProject = (e, id) => {
    e?.stopPropagation();
  };

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

  // Fetch All projects Data 
  const getAllProjects = async () => {
    try {
      const data = await getAllProjects();
      console.log(data)
    } catch (error) {

    }
  }

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
        <Sidebar activeSession={activeSession} setActiveSession={setActiveSession} />


        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                setIsCreateModalOpen(true);
              }}
              className="group inline-flex items-center justify-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 border border-indigo-400/20 transition-all duration-200 cursor-pointer w-full sm:w-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-white/20 transition-transform duration-200 group-hover:rotate-90">
                <AddIcon sx={{ fontSize: 16 }} />
              </span>
              <span>New Project</span>
            </button>
          </div>

          {/* Section Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {activeSession === "starred" ? "Starred Projects" : "Recent Projects"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeSession === "starred"
                  ? `Showing ${displayedProjects?.length || 0} starred project${(displayedProjects?.length || 0) === 1 ? "" : "s"}`
                  : `All your workspaces and recent projects (${displayedProjects?.length || 0})`}
              </p>
            </div>
          </div>

          {/* Loading Skeleton */}
          {projectsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border animate-pulse space-y-4"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          ) : (displayedProjects?.length || 0) === 0 ? (
            /* Empty State */
            <div
              className="p-10 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center transition-colors"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--card-bg)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  color: "var(--accent-color)",
                }}
              >
                {activeSession === "starred" ? <FiStar size={26} /> : <FiFolder size={26} />}
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                {activeSession === "starred" ? "No starred projects yet" : "No projects found"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-5">
                {activeSession === "starred"
                  ? "Click the star icon on any project to pin it here for quick access."
                  : "Get started by creating your very first AI coding project workspace."}
              </p>
              {activeSession !== "starred" && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setIsCreateModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                  Create First Project
                </button>
              )}
            </div>
          ) : (
            /* Projects Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedProjects?.map((project) => (
                <div
                  key={project._id}
                  className="group p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "rgba(99, 102, 241, 0.12)",
                          color: "var(--accent-color)",
                        }}
                      >
                        <FiFolder size={18} />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleStar(e, project._id)}
                          title={project.starred ? "Unstar project" : "Star project"}
                          aria-label={project.starred ? "Unstar project" : "Star project"}
                          className="p-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
                          style={{
                            color: project.starred ? "#EAB308" : "var(--muted-icon)",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                          }
                        >
                          <FiStar
                            size={16}
                            fill={project.starred ? "#EAB308" : "none"}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteProject(e, project._id)}
                          title="Delete project"
                          aria-label="Delete project"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors duration-150 cursor-pointer"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                          }
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
                      {project.description || "No description provided"}
                    </p>
                  </div>

                  <div
                    className="mt-4 pt-3 flex items-center justify-between text-[11px] border-t"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--secondary-text)",
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <FiClock size={12} />
                      {new Date(project.updatedAt || project.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-[11px] font-medium text-indigo-500 group-hover:underline">
                      Open →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Project Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div
                className="w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--primary-text)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Create New Project</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setErrorMsg("");
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-lg text-xs bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2">
                    <FiAlertCircle size={15} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--secondary-text)" }}
                    >
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. My Next.js App"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/30"
                      style={{
                        backgroundColor: "var(--hover-bg)",
                        borderColor: "var(--border-color)",
                        color: "var(--primary-text)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "var(--secondary-text)" }}
                    >
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What are you building?"
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 resize-none"
                      style={{
                        backgroundColor: "var(--hover-bg)",
                        borderColor: "var(--border-color)",
                        color: "var(--primary-text)",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        setErrorMsg("");
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-medium border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {isCreating ? "Creating..." : "Create Project"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>



      </div>
    </div>
  );
};

export default Dashboard;
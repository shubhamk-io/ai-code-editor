import React, { useState } from "react";
import { FiFolder, FiStar, FiSidebar, FiSettings, FiZap } from "react-icons/fi";

// ─── Upgrade Plan Mini Component ──────────────────────────────────────────────
const UpgradePlanCard = ({ isOpen, onUpgrade }) => {
  if (!isOpen) {
    return (
      <button
        onClick={onUpgrade}
        title="Upgrade Plan"
        aria-label="Upgrade Plan"
        className="w-full flex items-center justify-center py-2.5 rounded-md transition-colors duration-150 cursor-pointer"
        style={{ color: "var(--accent-color)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--hover-bg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <FiZap size={17} />
      </button>
    );
  }

  return (
    <div
      className="p-3 rounded-lg border transition-colors duration-200"
      style={{
        backgroundColor: "var(--hover-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "var(--accent-color)",
            }}
          >
            <FiZap size={14} />
          </div>
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--primary-text)" }}
          >
            Upgrade Plan
          </span>
        </div>

        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase"
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.18)",
            color: "#818CF8",
          }}
        >
          Pro
        </span>
      </div>

      <p
        className="text-[11px] mt-1.5 leading-relaxed"
        style={{ color: "var(--secondary-text)" }}
      >
        Access advanced AI models, faster generation & unlimited projects.
      </p>

      <button
        onClick={onUpgrade}
        className="w-full mt-2.5 py-1.5 px-3 rounded-md text-xs font-medium text-white transition-opacity duration-150 cursor-pointer hover:opacity-90 active:scale-[0.98]"
        style={{
          backgroundColor: "var(--accent-color)",
        }}
      >
        Upgrade Now
      </button>
    </div>
  );
};

// ─── Main Sidebar Component ───────────────────────────────────────────────────
const Sidebar = ({
  activeSession = "project",
  setActiveSession,
  onUpgradePlan,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSelectTab = (sessionId) => {
    if (setActiveSession) {
      setActiveSession(sessionId);
    }
  };

  const navItems = [
    { id: "project", label: "Projects", icon: FiFolder },
    { id: "starred", label: "Starred", icon: FiStar },
  ];

  return (
    <aside
      className={`h-[calc(100vh-57px)] transition-[width,background-color,border-color] duration-200 ease-in-out flex flex-col select-none shrink-0 overflow-hidden`}
      style={{
        width: isOpen ? "240px" : "64px",
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border-color)",
      }}
    >
      {/* ── Top Header: Toggle Button (Top Right when expanded, centered when collapsed) ── */}
      <div
        className={`h-14 px-3 flex items-center transition-colors duration-200 ${isOpen ? "justify-between" : "justify-center"
          }`}
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        {isOpen && (
          <span
            className="text-xs font-semibold uppercase tracking-wider pl-1 transition-colors duration-200"
            style={{ color: "var(--secondary-text)" }}
          >
            Workspace
          </span>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="p-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center"
          style={{
            color: "var(--muted-icon)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--hover-bg)";
            e.currentTarget.style.color = "var(--primary-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--muted-icon)";
          }}
        >
          <FiSidebar size={17} />
        </button>
      </div>

      {/* ── Navigation Menu Items (Projects, Starred) ───────────────── */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive =
            activeSession === id ||
            (id === "project" && activeSession === "projects") ||
            (id === "projects" && activeSession === "project");

          return (
            <button
              key={id}
              onClick={() => handleSelectTab(id)}
              title={label}
              aria-label={label}
              className={`relative w-full flex items-center rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${isOpen ? "px-3 py-2 gap-3" : "justify-center py-2 px-0"
                }`}
              style={{
                backgroundColor: isActive ? "var(--active-bg)" : "transparent",
                color: isActive ? "var(--primary-text)" : "var(--secondary-text)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                  e.currentTarget.style.color = "var(--primary-text)";
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = "var(--primary-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--secondary-text)";
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = "var(--muted-icon)";
                }
              }}
            >
              {/* Subtle active left accent indicator */}
              {isActive && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r"
                  style={{ backgroundColor: "var(--accent-color)" }}
                />
              )}

              <Icon
                size={17}
                className="shrink-0 transition-colors duration-150"
                style={{ color: isActive ? "var(--primary-text)" : "var(--muted-icon)" }}
              />

              {isOpen && <span className="truncate">{label}</span>}
            </button>
          );
        })}

        {/* ── Divider Line Below Starred ────────────────────────── */}
        <div
          className="my-2"
          style={{ borderTop: "1px solid var(--border-color)" }}
        />

        {/* ── Upgrade Plan Component ───────────────────────────── */}
        <UpgradePlanCard
          isOpen={isOpen}
          onUpgrade={() => {
            if (onUpgradePlan) onUpgradePlan();
            else console.log("Upgrade plan clicked");
          }}
        />
      </nav>

      {/* ── Bottom Section: Settings ────────────────────────────── */}
      <div
        className="p-2 transition-colors duration-200"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <button
          onClick={() => handleSelectTab("settings")}
          title="Settings"
          aria-label="Settings"
          className={`w-full flex items-center rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${isOpen ? "px-3 py-2 gap-3" : "justify-center py-2 px-0"
            }`}
          style={{
            backgroundColor: activeSession === "settings" ? "var(--active-bg)" : "transparent",
            color: activeSession === "settings" ? "var(--primary-text)" : "var(--secondary-text)",
          }}
          onMouseEnter={(e) => {
            if (activeSession !== "settings") {
              e.currentTarget.style.backgroundColor = "var(--hover-bg)";
              e.currentTarget.style.color = "var(--primary-text)";
              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "var(--primary-text)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeSession !== "settings") {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--secondary-text)";
              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "var(--muted-icon)";
            }
          }}
        >
          <FiSettings
            size={17}
            className="shrink-0 transition-colors duration-150"
            style={{
              color:
                activeSession === "settings"
                  ? "var(--primary-text)"
                  : "var(--muted-icon)",
            }}
          />
          {isOpen && <span className="truncate">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
// 4.28.01

import React, { useState, useRef, useEffect } from "react";
import { FiFolder, FiStar, FiClock, FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onToggleStar }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const [isStarred, setIsStarred] = useState(Boolean(project?.starred));

  useEffect(() => {
    setIsStarred(Boolean(project?.starred));
  }, [project?.starred]);

  // Navigate to project workspace when card or open is clicked
  const handleOpenProject = () => {
    if (project?._id) {
      navigate(`/project/${project._id}`);
    }
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsStarred((prev) => !prev);
    if (onToggleStar) {
      onToggleStar(e, project?._id);
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      onClick={handleOpenProject}
      className="group p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between relative"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <div>
        {/* Header: Folder Icon + Actions (Star, 3 Dots) */}
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

          <div className="flex items-center gap-1 relative">
            {/* Star Icon Button */}
            <button
              type="button"
              onClick={handleStarClick}
              title={isStarred ? "Unstar project" : "Star project"}
              aria-label={isStarred ? "Unstar project" : "Star project"}
              className="p-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
              style={{
                color: isStarred ? "#EAB308" : "var(--muted-icon)",
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
                fill={isStarred ? "#EAB308" : "none"}
                color={isStarred ? "#EAB308" : "currentColor"}
              />
            </button>

            {/* 3 Dots Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={handleMenuClick}
                title="Options"
                aria-label="Options"
                className="p-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
                style={{ color: "var(--muted-icon)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                  e.currentTarget.style.color = "var(--primary-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--muted-icon)";
                }}
              >
                <FiMoreVertical size={16} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border p-1 shadow-xl z-30 transition-all text-xs"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                    color: "var(--primary-text)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Options
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Name */}
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project?.name}
        </h3>

        {/* Project Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
          {project?.description || "No description provided"}
        </p>
      </div>

      {/* Footer: Date & Open Action */}
      <div
        className="mt-4 pt-3 flex items-center justify-between text-[11px] border-t"
        style={{
          borderColor: "var(--border-color)",
          color: "var(--secondary-text)",
        }}
      >
        <span className="flex items-center gap-1.5">
          <FiClock size={12} />
          {new Date(
            project?.updatedAt || project?.createdAt || Date.now()
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="text-[11px] font-medium text-indigo-500 group-hover:underline">
          Open →
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;

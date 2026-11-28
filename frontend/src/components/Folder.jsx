import React, { useState } from "react";
import { motion } from "motion/react";
import {
    ChevronRight,
    Folder as FolderIcon,
    FolderOpen,
    FolderPlus,
    FilePlus,
    FilePlus2,
    Pencil,
    Trash,
} from "lucide-react";

import { getFileIcon, getFolderColor } from "../utils/customizeIcon";
import { createFile, createFolder, deleteFile, updateFlile } from "../features/fileApi";
import { createPortal } from "react-dom";

const Folder = ({ projectId, tree, reloadTree, node, openFile }) => {
    const [fileName, setFileName] = useState("");
    const [folderName, setFolderName] = useState("");
    const [open, setOpen] = useState(false);
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [creatingFile, setCreatingFile] = useState(false);
    const [menu, setMenu] = useState(null);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");

    // Check whether the current node is a folder
    const isFolder = node?.type === "folder";
    const isRootFolder = isFolder && !node?.parentId;

    // Folder color based on its name
    const folderColor = getFolderColor(node?.name);

    // Dynamically get file icon and color
    const fileIcon = !isFolder ? getFileIcon(node?.name) : null;
    const FileTypeIcon = fileIcon?.icon;

    // Create a new folder
    const handleCreateFolder = async () => {
        if (!folderName.trim()) return;

        await createFolder({
            projectId,
            name: folderName.trim(),
            parentId: node._id,
        });

        setFolderName("");
        setCreatingFolder(false);
        await reloadTree();
    };

    // Create a new file
    const handleCreateFile = async () => {
        if (!fileName.trim()) return;

        await createFile({
            projectId,
            name: fileName.trim(),
            parentId: node._id,
        });

        setFileName("");
        setCreatingFile(false);
        await reloadTree();
    };

    // Delete feature placeholder
    const handleDelete = async () => {
        if (isRootFolder) return;
        await deleteFile({ id: node?._id });
        await reloadTree();
    };

    // Rename file / folder feature
    const handleRename = async () => {
        if (!renameValue.trim() || renameValue.trim() === node?.name) {
            setIsRenaming(false);
            return;
        }

        await updateFlile({
            name: renameValue.trim(),
            id: node?._id,
            content: node?.content,
        });
        setIsRenaming(false);
        await reloadTree();
    };

    // Open input for creating a folder
    const handleNewfolder = () => {
        setOpen(true);
        setCreatingFolder(true);
        setCreatingFile(false);
    };

    // Open input for creating a file
    const handleNewFile = () => {
        setOpen(true);
        setCreatingFile(true);
        setCreatingFolder(false);
    };

    return (
        <div className="relative select-none"
        
        >
            <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="group flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                onClick={() => openFile(node)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setMenu({ x: e.clientX, y: e.clientY });
                }}
            >
                {/* Folder/File name row */}
                <div
                    className="flex min-w-0 cursor-pointer flex-1 items-center gap-1.5"
                    onClick={() => !isRenaming && isFolder && setOpen(!open)}
                >
                    {isFolder ? (
                        <>
                            {/* Folder expand arrow */}
                            <motion.div
                                animate={{ rotate: open ? 90 : 0 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="shrink-0"
                            >
                                <ChevronRight
                                    size={14}
                                    className="text-zinc-500"
                                />
                            </motion.div>

                            {/* Dynamic folder icon */}
                            {open ? (
                                <FolderOpen
                                    size={15}
                                    className="shrink-0"
                                    style={{ color: folderColor }}
                                />
                            ) : (
                                <FolderIcon
                                    size={15}
                                    className="shrink-0"
                                    style={{ color: folderColor }}
                                />
                            )}
                        </>
                    ) : (
                        /* Dynamic file icon */
                        <div className="flex items-center gap-1.5 pl-4">
                            {FileTypeIcon && (
                                <FileTypeIcon
                                    size={14}
                                    className={`${fileIcon.color} shrink-0`}
                                />
                            )}
                        </div>
                    )}

                    {/* Inline Rename input OR File/Folder Name display */}
                    {isRenaming ? (
                        <input
                            autoFocus
                            value={renameValue}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRename();
                                if (e.key === "Escape") setIsRenaming(false);
                            }}
                            onBlur={() => handleRename()}
                            className="w-full bg-white/[0.08] border border-blue-500/50 rounded px-1.5 py-0.5 text-[12px] text-zinc-200 outline-none"
                        />
                    ) : (
                        <span className="truncate text-[12px] text-zinc-300 font-normal">
                            {node?.name}
                        </span>
                    )}
                </div>

                {/* Create icons — visible on hover, only for folders */}
                {isFolder && !isRenaming && (
                    <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                        {/* New folder button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNewfolder();
                            }}
                            className="p-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08]"
                            title="New Folder"
                        >
                            <FolderPlus size={13} />
                        </button>

                        {/* New file button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNewFile();
                            }}
                            className="p-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08]"
                            title="New File"
                        >
                            <FilePlus size={13} />
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Inline input for new folder */}
            {creatingFolder && (
                <div className="pl-7 pr-2 py-1">
                    <input
                        autoFocus
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreateFolder();

                            if (e.key === "Escape") {
                                setCreatingFolder(false);
                                setFolderName("");
                            }
                        }}
                        placeholder="folder name..."
                        className="w-full bg-white/[0.06] border border-white/[0.12] rounded px-2 py-0.5 text-[12px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500/50"
                    />
                </div>
            )}

            {/* Inline input for new file */}
            {creatingFile && (
                <div className="pl-7 pr-2 py-1">
                    <input
                        autoFocus
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreateFile();

                            if (e.key === "Escape") {
                                setCreatingFile(false);
                                setFileName("");
                            }
                        }}
                        placeholder="file name..."
                        className="w-full bg-white/[0.06] border border-white/[0.12] rounded px-2 py-0.5 text-[12px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500/50"
                    />
                </div>
            )}

            {/* Children list inside folder */}
            {isFolder && open && node?.children && (
                <div className="pl-3.5 border-l border-white/[0.06] ml-2.5">
                    {node.children.map((child, index) => (
                        <Folder
                            key={child?._id || index}
                            node={child}
                            projectId={projectId}
                            tree={tree}
                            reloadTree={reloadTree}
                            openFile={openFile}
                        />
                    ))}
                </div>
            )}

            {/* Context menu */}
            {menu &&
                createPortal(
                    <>
                        {/* Click outside to close menu */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            onClick={() => setMenu(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Menu popup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -6 }}
                            transition={{ duration: 0.14, ease: "easeOut" }}
                            className="fixed z-50 w-52 rounded-xl border border-white/[0.08] bg-[#17171a]/95 py-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
                            style={{ left: menu.x, top: menu.y }}
                        >
                            {/* Folder-specific actions */}
                            {isFolder && (
                                <>
                                    <button
                                        className="mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                        onClick={() => {
                                            setMenu(null);
                                            handleNewFile();
                                        }}
                                    >
                                        <FilePlus2 size={13} />
                                        New File
                                    </button>

                                    <button
                                        className="mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                        onClick={() => {
                                            setMenu(null);
                                            handleNewfolder();
                                        }}
                                    >
                                        <FolderPlus size={13} />
                                        New folder
                                    </button>

                                    <div className="my-1 h-px bg-white/[0.08]" />
                                </>
                            )}

                            {/* Rename */}
                            <button
                                className="mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-md px-3 py-2 text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                onClick={() => {
                                    setMenu(null);
                                    setRenameValue(node?.name || "");
                                    setIsRenaming(true);
                                }}
                            >
                                <Pencil size={13} />
                                Rename
                            </button>

                            {/* Delete - only show if NOT root folder */}
                            {!isRootFolder && (
                                <button
                                    className="mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-md px-3 py-2 text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                                    onClick={() => {
                                        setMenu(null);
                                        handleDelete();
                                    }}
                                >
                                    <Trash size={13} />
                                    Delete
                                </button>
                            )}

                        </motion.div>
                    </>,
                    document.body
                )}
        </div>
    );
};

export default Folder;

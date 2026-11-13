import React, { useState } from 'react'
import { motion } from "motion/react"
import { ChevronRight, Folder as FolderIcon, FolderOpen, File as FileIcon, FolderPlus, FilePlus } from 'lucide-react'
import { getFolderColor } from '../utils/customizeIcon'
import { createFile, createFolder } from '../features/fileApi'

const Folder = ({ projectId, tree, reloadTree, node }) => {

    const [fileName, setFileName] = useState("")
    const [folderName, setFolderName] = useState("")
    const [open, setOpen] = useState(false)
    const [creatingFolder, setCreatingFolder] = useState(false)
    const [creatingFile, setCreatingFile] = useState(false)

    const isFolder = node?.type === "folder"
    const folderColor = getFolderColor(node?.name)

    const handleCreateFolder = async () => {
        if (!folderName.trim()) return
        await createFolder({ projectId, name: folderName.trim(), parentId: node._id })
        setFolderName("")
        setCreatingFolder(false)
        await reloadTree()
    }

    const handleCreateFile = async () => {
        if (!fileName.trim()) return
        await createFile({ projectId, name: fileName.trim(), parentId: node._id })
        setFileName("")
        setCreatingFile(false)
        await reloadTree()
    }

    return (
        <div className='relative select-none'>
            <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="group flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
                {/* Folder/File name row */}
                <div
                    className='flex min-w-0 cursor-pointer flex-1 items-center gap-1.5'
                    onClick={() => isFolder && setOpen(!open)}
                >
                    {isFolder ? (
                        <>
                            <motion.div
                                animate={{ rotate: open ? 90 : 0 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="shrink-0"
                            >
                                <ChevronRight size={14} className='text-zinc-500' />
                            </motion.div>
                            {open ? (
                                <FolderOpen size={15} className='shrink-0' style={{ color: folderColor }} />
                            ) : (
                                <FolderIcon size={15} className='shrink-0' style={{ color: folderColor }} />
                            )}
                        </>
                    ) : (
                        <div className='flex items-center gap-1.5 pl-4'>
                            <FileIcon size={14} className='text-zinc-400 shrink-0' />
                        </div>
                    )}

                    <span className='truncate text-[12px] text-zinc-300 font-normal'>
                        {node?.name}
                    </span>
                </div>

                {/* Create icons — only show on hover, only for folders */}
                {isFolder && (
                    <div className='hidden group-hover:flex items-center gap-1 shrink-0'>
                        <button
                            onClick={(e) => { e.stopPropagation(); setCreatingFolder(true); setCreatingFile(false) }}
                            className='p-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08]'
                            title='New Folder'
                        >
                            <FolderPlus size={13} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setCreatingFile(true); setCreatingFolder(false) }}
                            className='p-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08]'
                            title='New File'
                        >
                            <FilePlus size={13} />
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Inline input for new folder */}
            {creatingFolder && (
                <div className='pl-7 pr-2 py-1'>
                    <input
                        autoFocus
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateFolder()
                            if (e.key === 'Escape') { setCreatingFolder(false); setFolderName("") }
                        }}
                        placeholder='folder name...'
                        className='w-full bg-white/[0.06] border border-white/[0.12] rounded px-2 py-0.5 text-[12px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500/50'
                    />
                </div>
            )}

            {/* Inline input for new file */}
            {creatingFile && (
                <div className='pl-7 pr-2 py-1'>
                    <input
                        autoFocus
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateFile()
                            if (e.key === 'Escape') { setCreatingFile(false); setFileName("") }
                        }}
                        placeholder='file name...'
                        className='w-full bg-white/[0.06] border border-white/[0.12] rounded px-2 py-0.5 text-[12px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500/50'
                    />
                </div>
            )}

            {/* Children list inside folder when open */}
            {isFolder && open && node?.children && (
                <div className='pl-3.5 border-l border-white/[0.06] ml-2.5'>
                    {node.children.map((child, index) => (
                        <Folder
                            key={child?._id || index}
                            node={child}
                            projectId={projectId}
                            tree={tree}
                            reloadTree={reloadTree}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Folder

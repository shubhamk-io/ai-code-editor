import React, { useState } from 'react'
import { motion } from "motion/react"
import { ChevronRight, Folder as FolderIcon, FolderOpen, File as FileIcon } from 'lucide-react'
import { getFolderColor } from '../utils/customizeIcon'

const Folder = ({ projectId, tree, reloadTree, node, name }) => {
    const [open, setOpen] = useState(false)
    const isFolder = node?.type === "folder"

      // acces customizeIcond from customizieIcon.js
        const Foldercolor = getFolderColor(node.name)

    return (

        <div className='relative select-none'>
            <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="group flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
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
                                <FolderOpen size={15} className='text-amber-400 shrink-0' />
                            ) : (
                                <FolderIcon size={15} className='text-amber-400 shrink-0' />
                            )}
                        </>
                    ) : (
                        <div className='flex items-center gap-1.5 pl-4'>
                            <FileIcon size={14} className={color} />
                        </div>
                    )}

                    <span className='truncate text-[12px] text-zinc-300 font-normal'>
                        {node?.name}
                    </span>
                </div>
            </motion.div>

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

import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { getFileIcon } from '../utils/customizeIcon'
import { X } from 'lucide-react'

const Editor = ({ activeTab, openTab, setOpenTab, setActiveTab }) => {
    return (
        <div className='flex flex-1 flex-col bg-[#0a0a0c]'>

            <div className='flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.06] bg-[#111113]/90'>
                <AnimatePresence initial={false}>
                    {openTab.map((tab) => {
                        const active = activeTab?._id === tab?._id
                        const { icon: Icon, color } = getFileIcon(tab?.name)

                        return (
                            <motion.div
                                key={tab._id}
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => setActiveTab(tab)}
                                className={`group relative flex h-full cursor-pointer items-center gap-2 whitespace-nowrap border-r border-white/[0.05] px-3.5 transition-colors ${active ? "bg-[#0a0a0c] text-white" : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300"}`}
                            >
                                <Icon size={14} color={color} />
                                <span className='text-[12px]'>{tab?.name}</span>

                                {/* Close tab button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setOpenTab((prev) => prev.filter((t) => t._id !== tab._id))
                                        if (active) {
                                            const remaining = openTab.filter((t) => t._id !== tab._id)
                                            setActiveTab(remaining[remaining.length - 1] || null)
                                        }
                                    }}
                                    className='ml-1 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-opacity'
                                >
                                    <X size={11} />
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

        </div>
    )
}

export default Editor
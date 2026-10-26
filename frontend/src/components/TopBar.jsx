import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"

const TopBar = () => {
    const { currentProject } = useSelector((state) => state.projects || {})
    const [showPreview, setShowPreview] = useState(false)

    return (
        <div className='relative flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#111113]/90 px-4 backdrop-blur-xl'>
            <div className='flex items-center gap-3'>
                <div className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-lg font-bold text-transparent'>
                    Worfes.AI
                </div>

                <div className='h-4 w-px bg-white/10' />

                <div className='flex items-center gap-2'>
                    <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[13px]'>
                        📂
                    </div>
                    <div className='max-w-[220px] truncate text-sm font-medium text-zinc-300'>
                        {currentProject?.name || "project"}
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-1.5'>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPreview(!showPreview)}
                    className='flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer'
                >
                    <span>{showPreview ? "Hide Preview" : "Live Preview"}</span>
                </motion.button>
            </div>
        </div>
    )
}

export default TopBar
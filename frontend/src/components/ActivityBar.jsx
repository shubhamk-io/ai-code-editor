import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { VscFiles, VscRobot, VscTerminal } from "react-icons/vsc"


function ActivityIcon({ icon: Icon, label, active, onClick }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className='relative'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className='relative flex h-[48px] w-[48px] items-center justify-center cursor-pointer'
                title={label}
            >
                {/* Active left indicator bar */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded-r-full bg-white'
                        />
                    )}
                </AnimatePresence>

                <Icon
                    size={24}
                    className={`transition-colors duration-150 ${active ? "text-sky-400" : "text-zinc-400 hover:text-zinc-200"}`}
                />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className='absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-zinc-800 border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-200 shadow-xl pointer-events-none z-50'
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


const ActivityBar = ({ showBot, setShowBot, showExplorer, setShowExplorer, showTerminal, setShowTerminal }) => {
 

    return (
        <div className='flex h-full w-[48px] shrink-0 flex-col items-center justify-between border-r border-white/[0.06] bg-[#181818] pt-0 select-none'>

            {/* Top Icons */}
            <div className='flex flex-col items-center'>
                <ActivityIcon
                    icon={VscFiles}
                    label="Explorer"
                    active={showExplorer}
                    onClick={() => setShowExplorer(prev => !prev)}
                />

                <ActivityIcon
                    icon={VscRobot}
                    label="AI Chat"
                    active={showBot}
                    onClick={() => setShowBot(prev => !prev)}
                />
            </div>

            {/* Bottom Icons */}
            <div className='flex flex-col items-center pb-1'>
                <ActivityIcon 
                    icon={VscTerminal}
                    label="Terminal"
                    active={showTerminal}
                    onClick={() => setShowTerminal(v => !v)}
                />
            </div>

        </div>
    )
}

export default ActivityBar

import React from 'react'
import { motion } from "motion/react"
import { FiRefreshCcw } from 'react-icons/fi'
import { FolderTree } from 'lucide-react'
import Folder from '../components/Folder'

const Explorer = ({ projectId, tree, reloadTree }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, width: 0 }}
      animate={{ opacity: 1, x: 0, width: 288 }}
      exit={{ opacity: 0, x: -16, width: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className='flex flex-col overflow-hidden border-r border-white/10 bg-[#0e0e11] backdrop-blur-xl'
    >

      {/* Explorer Header */}
      <div className='flex h-10 w-72 shrink-0 items-center justify-between border-b border-white/[0.06] px-3'>

        <span className='text-[11px] font-semibold tracking-wider text-zinc-500'>
          EXPLORER
        </span>

        <motion.button
          whileHover={{ rotate: 60 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={reloadTree}
          className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white'
          title='Refresh'
        >
          <FiRefreshCcw size={14} />
        </motion.button>

      </div>

      {/* Explorer Content */}
      <div className='w-72 flex-1 overflow-y-auto px-1 py-2
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-white/[0.08]
        hover:[&::-webkit-scrollbar-thumb]:bg-white/[0.15]'
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent"
        }}
      >

        {!tree || tree.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>

            <div className='flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]'>
              <FolderTree
                size={23}
                strokeWidth={1.5}
                className="text-zinc-500"
              />
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-[12px] font-medium text-zinc-400'>
                Empty Workspace
              </span>

              <span className='text-[10px] text-zinc-600'>
                No files found in this project
              </span>
            </div>

          </div>
        ) : (
          // map tree to showng all folder  and files like vsCode  
          // 1. create component to showing tree in easiley
          tree.map((node, index) => (
            <Folder
              key={node?._id || index}
              node={node}
              projectId={projectId}
              tree={tree}
              reloadTree={reloadTree}
            />
          ))
        )}  

      </div>

    </motion.div>
  )
}

export default Explorer
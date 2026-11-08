import React from 'react'
import { motion } from "motion/react"
import { FiRefreshCcw } from 'react-icons/fi'


const Explorer = ({ id, tree, relaodTree }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, width: 0 }}
      animate={{ opacity: 1, x: 0, width: 288 }}
      exit={{ opacity: 0, x: -16, width: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className='flex flex-col overflow-hidden border-r border-white/10 bg-[#0e0e11] backdrop-blur-xl'>

      <div className=' flex h-10 w-72 shrink-0 items-center justify-between border-b border-white/[0.06] px-3 '>

        <span className='text=[11px] font-semibold tracking-wider text-zinc-500'>
          EXPLORER
        </span>

        <motion.button
          whileHover={{ rotate: 60 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={relaodTree}   // onlick per reload tree call ho props se jo  ho project se data le ker aa rha hai 
          className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white '
          title='Refresh'
        >
              <FiRefreshCcw size={14} />
        </motion.button>

      </div>


    </motion.div>
  )
}

export default Explorer
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const Folder = ({ projectId, tree, reloadTree, node }) => {

    const [open, setOpen] = useState(false)

  return (
    <div className='relative '>
<motion.div  
whileHover={{x: 2}}
transition = {{duration: 0.15, ease:"easeOut"}}
className=" group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.05] transition-colors "
>

    <div className='flex min-w-0 cursor-pointer flex-1 items-center gap-1.5' 
    onClick={() => setOpen(!open)}
    >
        <motion.div  
        animate={{rotate:open ? 90: 0}}
        transition={{duration: 0.15, ease:"easeOut"}}
        className="shrink-0"
        >
            <ChevronRight size={14} className='text-zinc-500 ' />


        </motion.div>

    </div>
    
</motion.div>

    </div>
  )
}

export default Folder
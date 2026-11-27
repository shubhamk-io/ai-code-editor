import { AnimatePresence } from 'motion/react'
import React from 'react'

const Editor = ({activeTab ,openTab,setOpenTab ,setActiveTab})=> {
  return (
    <div className='flex flex-1 flex-col bg-[#0a0a0c]  '>

<div className='flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.06] bg-[#111113]/90 '>
<AnimatePresence  initial={false} >
    {openTab.map((tab) => {
        const active = activeTab?._id == tab?._id
    })}

</AnimatePresence>

</div>

    </div>
  )
}

export default Editor
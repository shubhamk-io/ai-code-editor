import React, { useState } from 'react'
import {motion} from "motion/react"


function ActivityIcon ({icon: Icon, label, active, onClick}) {
    const [[hovered], setHovered]= useState(false)
    return (
        <div className='relative'   
        onMouseEnter={() => setHovered(true)} // Mouse k hover hone per true 
        onMouseLeave={() => setHovered(false)} // mouse k  hover hone per false
        >



        </div>
    )
}


const ActivityBar = () => {
const [showExplorer, setShowExplorer] = useState(false)

    return (
        <div className='flex w-14 shrink-0 flex-col items-center gap-2 border-r border-white/[0.06] bg-[#111113]/90 py-3  '>

<ActivityIcon 
icon={files}
label={"Explorer"}
active={ showExplorer}
onClick={() => setShowExplorer(v => !v)}  // v agr true hai to false agr false hai true
/> 


        </div>
    )
}

export default ActivityBar
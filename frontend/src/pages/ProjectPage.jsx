import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'
import { AnimatePresence } from 'motion/react'
import Explorer from '../components/Explorer'
import {useParams} from "react-router-dom"
import { getSingleProject } from '../features/project.js'
import { useDispatch } from 'react-redux'

const ProjectPage = () => {


  const {id} = useParams()
  const [showExplorer, setShowExplorer] = useState(true)
  const [showBot, setShowBot] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(false) // top bar preview
  const dispatch = useDispatch()

const handleGetProject = async () => {
const data = await getSingleProject(id)
dispatch(setCurrentProject(data))  // set data in current redux state to acces esily
 }

 useEffect(() => {  // jb jb use ke id chage hoge tb tb ye call hoga mtlb ke ye data ayega
 handleGetProject()
 }, [id])
 
  

  return (
    <div className='relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]'>
      {/* Top Bar */}
      <TopBar
        // passin props to topbar.jsx 
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />

      {/* Main workspace area: ActivityBar + Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Activity Bar (narrow left sidebar with icons) */}
        <ActivityBar
          // passiing props to Activity bar 
          showExplorer={showExplorer}
          setShowExplorer={setShowExplorer}
          showBot={showBot}
          setShowBot={setShowBot}
          showTerminal={showTerminal}
          setShowTerminal={setShowTerminal}
        />`


        // Create explorer 
        <AnimatePresence  initial={flase}>
          // jb show Explorer true hoga tb he ye show ho //
          {showExplorer && (
            <Explorer />
          )  }
        </AnimatePresence>

        {/* Main content area — placeholder for now */}
        <div className='flex-1 overflow-hidden'>
          {/* Future: File Explorer Sidebar + Editor Panels will go here */}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage

import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'

const ProjectPage = () => {

  const [showExplorer, setShowExplorer] = useState(true)
  const [showBot, setShowBot] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(false) // top bar preview

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

        {/* Main content area — placeholder for now */}
        <div className='flex-1 overflow-hidden'>
          {/* Future: File Explorer Sidebar + Editor Panels will go here */}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage

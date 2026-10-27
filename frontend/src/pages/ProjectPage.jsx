import React from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'

const ProjectPage = () => {
  return (
    <div className='relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]'>
      <TopBar />
      <div className='flex-1 overflow-hidden'>
        <ActivityBar />
      </div>
    </div>
  )
}

export default ProjectPage

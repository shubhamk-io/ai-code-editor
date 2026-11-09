import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'
import { AnimatePresence } from 'motion/react'
import Explorer from '../components/Explorer'
import { useParams } from "react-router-dom"
import { getSingleProject } from '../features/project.js'
import { useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/projectSlice.js'
import { getTree, createRootFolder } from '../features/fileApi.js'

const ProjectPage = () => {


  const { id } = useParams()
  const [showExplorer, setShowExplorer] = useState(true)
  const [showBot, setShowBot] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(false) // top bar preview
  const [tree, setTree] = useState([])
  const dispatch = useDispatch()

  const loadTree = async () => {
    let data = await getTree({ projectId: id });
    console.log("Existing tree data:", data);

    if (!data || data.length === 0) {
      const projectData = await getSingleProject(id);
      const name = projectData?.name || projectData?.project?.name || "root";

      console.log("Creating root folder with name:", name);
      await createRootFolder({ projectId: id, projectName: name });

      data = await getTree({ projectId: id });
      console.log("Tree after creating root folder:", data);
    }

    setTree(data || []);
  };

  const handleGetProject = async () => {
    const data = await getSingleProject(id);
    dispatch(setCurrentProject(data)); // set data in current redux state to acces esily
  };

  useEffect(() => {
    if (id) {
      handleGetProject();
      loadTree();
    }
  }, [id]);



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
        />


        {/* Create explorer */}
        <AnimatePresence initial={false}>
          {/* jb show Explorer true hoga tb he ye show ho */}
          {showExplorer && (
            <Explorer
              projectId={id}
              tree={tree}
              reloadTree={loadTree}
            />
          )}
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

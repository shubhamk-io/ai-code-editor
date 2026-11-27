import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'
import { AnimatePresence, hover, motion } from 'motion/react'
import Explorer from '../components/Explorer'
import { useParams } from "react-router-dom"
import { getSingleProject } from '../features/project.js'
import { useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/projectSlice.js'
import { getTree, createRootFolder } from '../features/fileApi.js'
import { Code2, Eye, Maximize2, Minimize2 } from 'lucide-react'
const ProjectPage = () => {


  const { id } = useParams()
  const [showExplorer, setShowExplorer] = useState(true)
  const [showBot, setShowBot] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(false) // top bar preview
  const [mobilePanel, setMobilePanel] = useState("explorer")
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false)
  const [tree, setTree] = useState([])
  const dispatch = useDispatch()

  const loadTree = async () => {
    let data = await getTree({ projectId: id });

    if (!data || data.length === 0) {
      const projectData = await getSingleProject(id);
      const name = projectData?.name || projectData?.project?.name || "root";

      console.log("Creating root folder with name:", name);
      await createRootFolder({ projectId: id, projectName: name });

      data = await getTree({ projectId: id });
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
        <div className='hidden md:block'>
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

        </div>


        {/* Create explorer */}
        <div className={`${mobilePanel === "explorer" ? "flex" : "hidden"
          } w-full md:flex md:w-auto`}>
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
        </div>

        {/* Main content area — placeholder for now */}
        <div className={`${mobilePanel === "editor" ? "flex" : "hidden"} 
           relative w-full min-w-0 flex flex-1 flex-col overflow-hidden border-x border-white/[0.05] md:flex `}>
          {/* Future: File Explorer Sidebar + Editor Panels will go here */}

          <div className='pointer-events-none absolute right-2 top-2 z-40 flex items-center gap-1.5 sm:right-4 sm:top-3 sm:gap-2'>
            {/* showPreview is true  then showng button minimize and maximize  */}
            {showPreview && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                type="button"
                onClick={() => setIsPreviewFullScreen((v) => !v)}
                title={isPreviewFullScreen ? "Exit fullscreen" : "Fullscreen preview"}
                className='pointer-events-auto flex items-center justify-center rounded-lg border border-white/10 bg-[#111113]/95 p-1.5 text-zinc-400 shadow-lg shadow-black/40 backdrop-blur hover:text-white cursor-pointer sm:p-2'
              >
                {isPreviewFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </motion.button>
            )}

            <div className='pointer-events-auto flex items-center gap-0.5 border border-white/10 bg-[#111113]/95 shadow-black/40 backdrop-blur '>

              <button
                onClick={() => {
                  setShowPreview(false);
                  setIsPreviewFullScreen(false)
                }}
                className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors sm:px-3 sm:py-1.5 ${showPreview ? "text-white" : "text-zinc-500 hover:text-zinc-300"} `} >

                {!showPreview && (
                  <motion.div
                    className='absolute insert-0 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-800'
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <Code2 size={13} className='relative' />
               <span className='relative hidden sm:inline'> Editor</span>
              </button>

              <button
                onClick={() => setShowPreview(true)}
                className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors sm:px-3 sm:py-1.5 ${showPreview ? "text-white" : "text-zinc-500 hover:text-zinc-300"} `} >

                {showPreview && (
                  <motion.div
                    className='absolute insert-0 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-800'
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <Eye size={13} className='relative' />
                <span className='relative hidden sm:inline'  > Preview</span>

              </button>

            </div>

          </div>
        </div>


        
      </div>
    </div>
  )
}

export default ProjectPage

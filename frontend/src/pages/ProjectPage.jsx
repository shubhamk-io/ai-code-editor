import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import ActivityBar from '../components/ActivityBar'
import { AnimatePresence, motion } from 'motion/react'
import Explorer from '../components/Explorer'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { useParams } from 'react-router-dom'
import { getSingleProject } from '../features/project.js'
import { useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/projectSlice.js'
import { getTree, createRootFolder } from '../features/fileApi.js'
import { Code2, Eye, Maximize2, Minimize2 } from 'lucide-react'

const ProjectPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [showExplorer, setShowExplorer] = useState(true)
  const [showBot, setShowBot] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [mobilePanel, setMobilePanel] = useState('explorer')
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false)
  const [openTab, setOpenTab] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [tree, setTree] = useState([])

  // Open a file: add to tabs if not already open, set as active
  const openFile = (node) => {
    if (!node || node.type === 'folder') return
    setOpenTab((prev) => {
      const alreadyOpen = prev.find((t) => t._id === node._id)
      if (alreadyOpen) return prev
      return [...prev, node]
    })
    setActiveTab(node)
    setShowPreview(false)
  }

  const loadTree = async () => {
    let data = await getTree({ projectId: id })
    if (!data || data.length === 0) {
      const projectData = await getSingleProject(id)
      const name = projectData?.name || projectData?.project?.name || 'root'
      await createRootFolder({ projectId: id, projectName: name })
      data = await getTree({ projectId: id })
    }
    setTree(data || [])
  }

  const handleGetProject = async () => {
    const data = await getSingleProject(id)
    dispatch(setCurrentProject(data))
  }

  useEffect(() => {
    if (id) {
      handleGetProject()
      loadTree()
    }
  }, [id])

  return (
    <div className='relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]'>
      <TopBar setShowPreview={setShowPreview} showPreview={showPreview} />

      <div className='flex flex-1 overflow-hidden'>

        {/* Activity Bar */}
        <div className='hidden md:block'>
          <ActivityBar
            showExplorer={showExplorer} setShowExplorer={setShowExplorer}
            showBot={showBot} setShowBot={setShowBot}
            showTerminal={showTerminal} setShowTerminal={setShowTerminal}
          />
        </div>

        {/* File Explorer Sidebar */}
        <div className={`${mobilePanel === 'explorer' ? 'flex' : 'hidden'} w-full md:flex md:w-auto`}>
          <AnimatePresence initial={false}>
            {showExplorer && (
              <Explorer
                projectId={id}
                tree={tree}
                reloadTree={loadTree}
                openFile={openFile}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Main Editor + Preview area */}
        <div className={`${mobilePanel === 'editor' ? 'flex' : 'hidden'} relative flex flex-1 flex-col overflow-hidden border-x border-white/[0.05] md:flex`}>

          {/* Top-right Controls: Editor/Preview toggle + Fullscreen */}
          <div className='pointer-events-none absolute right-2 top-2 z-40 flex items-center gap-1.5 sm:right-4 sm:top-3 sm:gap-2'>

            {/* Maximize / Minimize only when preview is visible */}
            <AnimatePresence>
              {showPreview && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  type='button'
                  onClick={() => setIsPreviewFullScreen((v) => !v)}
                  title={isPreviewFullScreen ? 'Exit fullscreen' : 'Fullscreen preview'}
                  className='pointer-events-auto flex items-center justify-center rounded-lg border border-white/10 bg-[#111113]/95 p-1.5 text-zinc-400 shadow-lg shadow-black/40 backdrop-blur hover:text-white cursor-pointer sm:p-2'
                >
                  {isPreviewFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Editor / Preview toggle pill */}
            <div className='pointer-events-auto flex items-center rounded-lg border border-white/10 bg-[#111113]/95 p-0.5 shadow-lg shadow-black/40 backdrop-blur'>
              <button
                type='button'
                onClick={() => { setShowPreview(false); setIsPreviewFullScreen(false) }}
                className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer sm:px-3 sm:py-1.5 ${!showPreview ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Code2 size={13} />
                <span className='hidden sm:inline'>Editor</span>
              </button>
              <button
                type='button'
                onClick={() => setShowPreview(true)}
                className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer sm:px-3 sm:py-1.5 ${showPreview ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Eye size={13} />
                <span className='hidden sm:inline'>Preview</span>
              </button>
            </div>
          </div>

          {/* Editor OR Preview — rendered here in the main area */}
          {showPreview ? (
            <Preview tree={tree} />
          ) : (
            <Editor
              activeTab={activeTab}
              openTab={openTab}
              setOpenTab={setOpenTab}
              setActiveTab={setActiveTab}
            />
          )}

        </div>
      </div>
    </div>
  )
}

export default ProjectPage

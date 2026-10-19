import File from "../model/file.model"

export const createRootFile = async (req, res) => {
    try {
        const { projectId, projectName } = req.body
        const userId = req.headers["x-user-id"]

        if (!projectId || !projectName) {
            return res.status(400).json({ Message: "ProjectId and name is requiered" })
        }
        // find fist ExistingRootFolder  is exist or not 
        const existingRootFolder = await File.findOne({
            projectId,
            parentId: null,
            isDeleted: false
        })

        if (existingRootFolder) {
            return res.status(400).json({ message: "Root folder already exist" })
        }
        const rootFolder = await File.create({
            owner: userId,
            name: projectName,
            projectId,
            type: "folder",
            parentId: null
        })

        return res.status(201).json(rootFolder)

    } catch (error) {
return res.status(500).json({Message: `Create root folder Error : ${error}`})
    }
}


// Create normal folder   controller 

export const createFolder = async (req, res) => {
    try {
        const {projectId , name , parentId} = req.body
        const userId = req.headers["x-user-id"]

       if(!projectId || !name || parentId){
        return res.status(200).json({message:"projectId and name are requiredc"})
       }
       

        const exist = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted:false
        })
        // if folder check exist if exist then show
        if(exist) {
            return res.status(400).json({message:"folder already exist"})
        }

        const folder = await File.create({
            owner:userId,
            name,
            projectId,
            type,"folder",
            parentId
        })

        return res.status(201).json({folder})
        
    } catch (error) {
        return res.status(500).json({message:`Creae Folder error: ${error}`})
    }
}
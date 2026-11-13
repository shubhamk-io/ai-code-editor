
import File from "../model/file.model.js"
import { buildTree } from "../utils/buildTree.js"

export const createRootFolder = async (req, res) => {
    try {
        const { projectId, projectName } = req.body
        const userId = req.headers["x-user-id"]

        if (!projectId || !projectName) {
            return res.status(400).json({ Message: "ProjectId and name is requiered" })
        }
        const rootFolder = await File.findOneAndUpdate(
            { projectId, parentId: null, isDeleted: false },
            { $setOnInsert: { owner: userId, name: projectName, projectId, type: "folder", parentId: null } },
            { upsert: true, new: true }
        )

        return res.status(200).json(rootFolder)

    } catch (error) {
        return res.status(500).json({ Message: `Create root folder Error : ${error}` })
    }
}


// Create normal folder   controller 

export const createFolder = async (req, res) => {
    try {
        const { projectId, name, parentId } = req.body
        const userId = req.headers["x-user-id"]

        if (!projectId || !name) {
            return res.status(200).json({ message: "projectId and name are required" })
        }


        const exist = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted: false
        })
        // if folder check exist if exist then show
        if (exist) {
            return res.status(400).json({ message: "folder already exist" })
        }

        const folder = await File.create({
            owner: userId,
            name,
            projectId,
            type: "folder",
            parentId
        })

        return res.status(201).json({ folder })

    } catch (error) {
        return res.status(500).json({ message: `Create Folder error: ${error}` })
    }
}


// Create file  feature   
export const createFile = async (req, res) => {
    try {

        const { projectId, projectName, name, parentId, content = "", language = "plainText" } = req.body
        const userId = req.headers["x-user-id"]

        if (!projectId || !name) {
            return res.status(400).json({ message: "File name projectid are required" })
        }

        const exist = await File.findOne({
            projectId,
            name,
            parentId,
            isDeleted: false,
        })

        if (exist) {
            return res.status(400).json({ message: "File already exist" })
        }

        const extension = name.includes(".") ? name.split(".").pop() : " "

        const file = await File.create({
            owner: userId,
            name,
            projectId,
            content,
            extension,
            parentId: parentId || null,
            type: "file"
        })

        return res.status(200).json(file)

    } catch (error) {
        return res.status(500).json({ message: `Create file error: ${error}` })
    }

}

export const updateFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const { name, content } = req.body

        // find project by id 
        const { id } = req.params

        const file = await File.findOne({
            _id: id,
            owner: userId,
            isDeleted: false
        })

        if (name) {
            file.name = name
            file.extension = name.includes(".") ? name.split(".").pop() : ""
        }

        if (content !== undefined) {
            file.content = content,
                file.size = content.length
        }

        await file.save()

        return res.status(200).json(file)

    } catch (error) {
        return res.status(500).json({ message: `Update File error: ${error}` })
    }
}



// Delete function create

export const deleteFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const { id } = req.params

        const file = await File.findOneAndDelete({
            _id: id,
            owner: userId
        })

        if (!file) {
            return res.status(404).json({ message: "File not found" })
        }

        return res.status(200).json({ message: "File deleted successfully", file })

    } catch (error) {
        return res.status(500).json({ message: `File Delete funciton error: ${error}` })
    }
}


export const getFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const { id } = req.params

        const file = await File.findOne({
            _id: id,
            owner: userId
        })

        if (!file) {
            return res.status(400).json({ Message: "File not found" })
        }

        return res.status(200).json(file)

    } catch (error) {
        return res.status(500).json({ message: `Get file Error: ${error}` })
    }

}


// Get tree  function 
export const getTree = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const { projectId } = req.params

        const files = await File.find({
            projectId,
            owner: userId,
            isDeleted: false
        }).sort({
            name: 1,
            type: -1
        })

        const tree = await buildTree(files)

        return res.status(200).json(tree)

    } catch (error) {
        return res.status(500).json({ message: `Get Tree error: ${error}` })
    }
}
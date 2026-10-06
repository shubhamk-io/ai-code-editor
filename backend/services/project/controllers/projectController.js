import redis from "../../../shared/redis.js";
import Project from "../models/projectModel.js";;



// Create project function
export const createProject = async (req, res) => {
    try {
        // 1. Get user id by header 
        const userId = req.header["x-user-id"]
        if (!userId) {
            return res.status(401).json({ message: "User id is required" })
        }

        // 2. get name, description to req.body frontend .
        const { name, description } = req.body;

        // 3. create new project ----
        const newProject = await Project.create({
            owner: userId,
            name,
            description
        })

        // if project is create now delete old project in redis or fer re fetch hoga
        const key = `project-${userId}`

        // Delete key in redis.
        await redis.del(key)

        return res.status(201).json(newProject)

    } catch (error) {
        return res.status(500).json({ message: `create project error: ${error}` })
    }
}


// Get our ALL projects //
export const allProjects = async (req, res) => {
    try {
        // 1. Get userId to access id and owner 
        const userId = req.header["x-user-id"];

        if (!userId) {
            return res.status(401).json({ message: "User is required" });
        }

        // using redis bcause never call get allProject api when user refresh 
        // --- set data in redis to get easily for refresh
        // 1.create key using userId ------
        const key = `project-${userId}`
        let result = await redis.get(key)
        // condition agr result/ project hai to return ker do projects 
        if (result) {
            return res.status(200).json(JSON.parse(result))
        }


        // 2. access all project jo user na create kiye hai
        const projects = await Project.find({
            owner: userId
        }).sort({ updatedAt: -1 }) // .sort using for show newly updated project on top
        await redis.set(key, JSON.stringify(projects))

        return res.status(200).json(projects)


    } catch (error) {
        return res.status(500).json({ message: `Get all project Error: ${error}` })
    }
}

// Get single project //
export const singleProject = async (req, res) => {
    try {
        // 1. Get user Id by header 
        const userId = req.header["x-user-id"];

        // 2. get project 
        const project = await Project.findOne({
            _id: req.params.projectId, // if you create project mongodb assing projecID // you get project id using {req.params.projectId}
            owner: userId
        })

        if (!project) {
            return res.status(404).json({ message: "project not found" })
        }

        project.lastOpendAt = new Data() // update project date jo last the oo update ho jyege
        await project.save()  // save project

        return res.status(200).json(project)

    } catch (error) {
        return res.status(500).json({ message: `single project get error:${error}` })
    }
}


// Starred project controlelr //
export const getSatrredProject = async (req, res) => {
    try {
        // 1. get user id by header
        const userId = req.header["x-user-id"];
        if (userId) {
            return res.status(401).json({ message: "User id is required " })
        }

        // 2. find project 
        const stProject = await Project.find({
            owner: userId,
            starred: true
        }).sort({ updatedAt: -1 })  // show new updated project on top

        return res.status(200).json(stProject)

    } catch (error) {
        return res.status(500).json({ message: `Get satrred project Error:${error}` })
    }
}


// Toggle starrated project
export const toggleStarraedProject = async () => {
    try {
        // 1. Get id by req.params
        const { id } = req.params

        // 32. find project by id and then toggle like [true / false]
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ message: "Project isn not found" })
        }
        // if project is true to false  // false to true ker do 
        project.starred = !project.starred
        project.save()  // project save.

        return res.json(200).json(project)

    } catch (error) {
        return res.status(500).json({ message: `Toggle starred prject error ${error}` })
    }
}


// Delete project function ///
export const deleteProject = async (req, res) => {
    try {
        // 1. Get project id using req.params //
        const { id } = req.params

        // 2.find project using this id and delte 
        const project = await Project.findOneAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "project not found" })
        }

        return res.status(200).json(project)

    } catch (error) {
        return res.status(500).json({ message: `Project Delete Error: ${error}` })
    }
}
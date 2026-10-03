import project from "./models/projectModel.js";


// Create project function
export const createProject = async () => {
    try {
        // 1. Get user id by header 
        const userId = req.header["x-user-id"]
        if (!userId) {
            return res.status(401).json({ message: "User id is required" })
        }

        // 2. get name, description to req.body frontend .
        const { name, description } = req.body;

        // 3. create new project ----
        const newProject = await project.create({
            owner: userId,
            name,
            description
        })

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

        // 2. access all project jo user na create kiye hai
        const projects = await project.find({
            owner: userId
        }).sort({ updatedAt: -1 }) // .sort using for show newly updated project on top

        return res.status(201).json(projects)


    } catch (error) {
        return res.status(500).json({ message: `Get all project Error: ${error}` })
    }
}

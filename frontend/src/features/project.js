import axios from "axios"


// create project 
export const createProject = async ({ name, description }) => {
    try {
        const { data } = await axios.post("/api/project", { name, description })
        return data
    } catch (error) {
console.log(error)
return null;
    }
} 

// get single Project api fectch
export const getSingleProject = async (projectId) => {
    try {
        const {data} = await axios.get(`"/api/singleProject",${projectId}`)
        return data
    } catch (error) {
     console.log(error)
     return null   
    }
}

// Get all project 
export const getAllProjects = async () => {
   try {
     const {data} = await axios.get("/api/allProjects")
     return data
   } catch (error) {
    console.log(error)
    return null
   }
}


// Get starred projects // 
export const starredProject = async () => {
    try {
        const {data} = axios.get("/api/satrred")
        return data 
    } catch (error) {
        console.log(error)
        return null;
    }
}

// Get toggle starred projects
export const toggleStarraedProject = async (id) => {
    try {
        const {data} = await axios.patch(`/api/project,${id}`)
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

// Delete project 
export const deleteProject = async (id) => {
    try {
        const {data} = await axios.delete(`/api/project,${id}`)
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
}
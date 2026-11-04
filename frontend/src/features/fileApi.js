import axios from "axios"


export const createRootFolder = async ({ projectId, projectName }) => {
    try {
        const { data } = await axios.post("/api/file/create-root-folder", { projectId, projectName })
        return data;

    } catch (error) {
        console.log(error)
    }
}

//  creae folder api fetch
export const createFolder = async ({ projectId, projectName, name }) => {
    try {
        const { data } = await axios.post("/api/file/create-folder", { projectId, name, parentId })
        return data;

    } catch (error) {
        console.log(error)
    }
}

// Create file route fetch api
export const createFile = async ({ projectId, projectName, name, parentId, content }) => {
    try {
        const { data } = await axios.post("/api/file/create-File", {
            projectId, projectName, name, parentId
            , content
        })

        return data;

    } catch (error) {
console.log(error)
    }
}

//  create updatefile fetch api
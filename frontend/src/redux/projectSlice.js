import { createSlice } from "@reduxjs/toolkit"


const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [], // this is using to store projects in array to show easily.
        starredProjects: []  // this is using to store starred projects in array to show easily
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },

        // this reducer using to push projecst in projects state
        addNewProject: (state, action) => {
            state.projects.unshift(action.payload)  // end mai  element ko push kerne k liye push() method  // and starting mai push kerne k liye{ unShift()} method
        },

        // toggle starred state of a project
        toggleProjectStar: (state, action) => {
            const id = action.payload;
            const project = state.projects?.find((p) => p._id === id);
            if (project) {
                project.starred = !project.starred;
            }
        },

        // remove project from state
        removeProject: (state, action) => {
            const id = action.payload;
            state.projects = state.projects?.filter((p) => p._id !== id) || [];
        },
    },
});

export const { setProjects, addNewProject, toggleProjectStar, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
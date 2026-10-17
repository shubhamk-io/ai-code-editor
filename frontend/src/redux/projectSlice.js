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
    },
});

export const { setProjects, addNewProject,} = projectSlice.actions;

export default projectSlice.reducer;
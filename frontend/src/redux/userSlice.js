import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    // This setUserData using to set userData jo upper hai
    setUserData: (state, action) => {
      // setting user data paylod to state.UserData
      state.userData = action.payload;
    },
  },
});


export const {setUserData} =userSlice.actions

// This user key sending to store name:{reducer}
export default userSlice.reducer
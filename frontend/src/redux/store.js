import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
// ...
const store = configureStore({

    // 1. Create userSlice store all user data 

  reducer:{
    user:userReducer
  },

})
export default store
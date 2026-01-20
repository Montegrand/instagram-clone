import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store

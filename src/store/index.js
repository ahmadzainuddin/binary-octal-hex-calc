import { configureStore } from '@reduxjs/toolkit'
import calcReducer from './calcSlice'

const store = configureStore({
  reducer: {
    calc: calcReducer,
  }
})

export default store

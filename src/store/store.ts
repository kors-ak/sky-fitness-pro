import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { coursesSliceReducer } from './features/coursesSlice'
import { userSliceReducer } from './features/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      user: userSliceReducer,
      courses: coursesSliceReducer,
    }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

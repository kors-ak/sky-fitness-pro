import { CourseType } from '@/sharedTypes/CourseType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  fetchIsLoading: boolean
  fetchError: string
  fetchIsUserCoursesLoading: boolean
  fetchUserCoursesError: string
  allCourses: CourseType[]
  userCourses: CourseType[]
}

const initialState: initialStateType = {
  fetchIsLoading: true,
  fetchError: '',
  fetchIsUserCoursesLoading: false,
  fetchUserCoursesError: '',
  allCourses: [],
  userCourses: [],
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload
    },
    setUserCoursesIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsUserCoursesLoading = action.payload
    },
    setUserCoursesError: (state, action: PayloadAction<string>) => {
      state.fetchUserCoursesError = action.payload
    },
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload
    },
    setUserCourses: (state, action: PayloadAction<string[]>) => {
      state.userCourses = [...state.allCourses].filter((course) =>
        action.payload.includes(course._id)
      )
    },
    resetCourseSlice: (state) => ({
      ...initialState,
      allCourses: state.allCourses,
    }),
  },
})

export const {
  setFetchIsLoading,
  setFetchError,
  setUserCoursesIsLoading,
  setUserCoursesError,
  setAllCourses,
  setUserCourses,
  resetCourseSlice,
} = coursesSlice.actions
export const coursesSliceReducer = coursesSlice.reducer

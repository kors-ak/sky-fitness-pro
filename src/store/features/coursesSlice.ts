import { CourseType } from '@/sharedTypes/CourseType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  fetchIsLoading: boolean
  fetchError: string
  fetchIsUserCoursesLoading: boolean
  fetchUserCoursesError: string
  moveCourseIsLoading: boolean
  allCourses: CourseType[]
  userCourses: CourseType[]
}

const initialState: initialStateType = {
  fetchIsLoading: false,
  fetchError: '',
  fetchIsUserCoursesLoading: false,
  fetchUserCoursesError: '',
  moveCourseIsLoading: false,
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
    setMoveCourseIsLoading: (state, action: PayloadAction<boolean>) => {
      state.moveCourseIsLoading = action.payload
    },
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload
    },
    setUserCourses: (state, action: PayloadAction<string[]>) => {
      state.userCourses = [...state.allCourses].filter((course) =>
        action.payload.includes(course._id)
      )
    },
    addNewUserCourse: (state, action: PayloadAction<string>) => {
      const newCourse = state.allCourses.find(
        (course) => course._id === action.payload
      )

      if (
        newCourse &&
        !state.userCourses.some((course) => course._id === action.payload)
      ) {
        state.userCourses.push(newCourse)
      }
    },
    removeNewUserCourse: (state, action: PayloadAction<string>) => {
      state.userCourses = state.userCourses.filter(
        (course) => course._id !== action.payload
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
  setMoveCourseIsLoading,
  addNewUserCourse,
  removeNewUserCourse,
  setAllCourses,
  setUserCourses,
  resetCourseSlice,
} = coursesSlice.actions
export const coursesSliceReducer = coursesSlice.reducer

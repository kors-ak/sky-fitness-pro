import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  fetchIsLoading: boolean
  fetchError: string
  fetchIsUserCoursesLoading: boolean
  fetchUserCoursesError: string
  moveCourseIsLoading: boolean
  allCourses: CourseType[]
  userCourses: UserCourseType[]
  userProgress: CourseProgress[]
  progressLoading: Record<string, boolean>
}

const initialState: initialStateType = {
  fetchIsLoading: false,
  fetchError: '',
  fetchIsUserCoursesLoading: false,
  fetchUserCoursesError: '',
  moveCourseIsLoading: false,
  allCourses: [],
  userCourses: [],
  userProgress: [],
  progressLoading: {},
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
      state.userCourses = state.allCourses
        .filter((course) => action.payload.includes(course._id))
        .map((course) => ({
          ...course,
          workouts: [],
        }))
    },
    addNewUserCourse: (state, action: PayloadAction<string>) => {
      const newCourse = state.allCourses.find(
        (course) => course._id === action.payload
      )

      if (
        newCourse &&
        !state.userCourses.some((course) => course._id === action.payload)
      ) {
        state.userCourses.push({
          ...newCourse,
          workouts: [],
        })
      }
    },
    removeNewUserCourse: (state, action: PayloadAction<string>) => {
      state.userCourses = state.userCourses.filter(
        (course) => course._id !== action.payload
      )
    },
    addUserCourseWorkouts: (
      state,
      action: PayloadAction<{
        id: string
        workouts: WorkoutType[]
      }>
    ) => {
      const currentCourse = state.userCourses.find(
        (el) => el._id === action.payload.id
      )

      if (currentCourse) {
        currentCourse.workouts = action.payload.workouts
      }
    },
    setUserProgress: (state, action: PayloadAction<CourseProgress>) => {
      const isInArray = state.userProgress.find(
        (el) => el.courseId === action.payload.courseId
      )

      if (isInArray) {
        state.userProgress.filter(
          (el) => el.courseId !== action.payload.courseId
        )
      }

      state.userProgress.push(action.payload)
    },
    setCourseProgressLoading: (
      state,
      action: PayloadAction<{ id: string; isLoading: boolean }>
    ) => {
      state.progressLoading[action.payload.id] = action.payload.isLoading
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
  addUserCourseWorkouts,
  setUserProgress,
  setCourseProgressLoading,
  resetCourseSlice,
} = coursesSlice.actions
export const coursesSliceReducer = coursesSlice.reducer

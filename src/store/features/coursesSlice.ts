import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  fetchIsLoading: boolean
  fetchIsUserCoursesLoading: boolean
  isUserCoursesLoaded: boolean
  moveCourseIsLoading: boolean
  allCourses: CourseType[]
  userCourses: UserCourseType[]
  userProgress: CourseProgress[]
  progressLoading: Record<string, boolean>
}

const initialState: initialStateType = {
  fetchIsLoading: false,
  fetchIsUserCoursesLoading: false,
  isUserCoursesLoaded: false,
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
    setUserCoursesIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsUserCoursesLoading = action.payload
    },
    setUserCoursesLoaded: (state, action: PayloadAction<boolean>) => {
      state.isUserCoursesLoaded = action.payload
    },
    setMoveCourseIsLoading: (state, action: PayloadAction<boolean>) => {
      state.moveCourseIsLoading = action.payload
    },
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload
    },
    addNewUserCourse: (
      state,
      action: PayloadAction<{ courseId: string; workouts: WorkoutType[] }>
    ) => {
      const newCourse = state.allCourses.find(
        (course) => course._id === action.payload.courseId
      )

      if (
        newCourse &&
        !state.userCourses.some(
          (course) => course._id === action.payload.courseId
        )
      ) {
        state.userCourses.push({
          ...newCourse,
          workouts: action.payload.workouts,
        })
      }
    },
    removeNewUserCourse: (state, action: PayloadAction<string>) => {
      state.userCourses = [...state.userCourses].filter(
        (course) => course._id !== action.payload
      )
      state.userProgress = [...state.userProgress].filter(
        (course) => course.courseId !== action.payload
      )
    },
    setUserProgress: (state, action: PayloadAction<CourseProgress>) => {
      const isHere = state.userProgress.find(
        (el) => el.courseId === action.payload.courseId
      )

      if (isHere) {
        state.userProgress = state.userProgress.map((el) =>
          el.courseId === action.payload.courseId ? action.payload : el
        )
      } else {
        state.userProgress.push(action.payload)
      }
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
  setUserCoursesIsLoading,
  setUserCoursesLoaded,
  setMoveCourseIsLoading,
  addNewUserCourse,
  removeNewUserCourse,
  setAllCourses,
  setUserProgress,
  setCourseProgressLoading,
  resetCourseSlice,
} = coursesSlice.actions
export const coursesSliceReducer = coursesSlice.reducer

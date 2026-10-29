import {
  addUserCourse,
  getCourseWorkouts,
  removeUserCourse,
} from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import {
  addNewUserCourse,
  removeNewUserCourse,
  setMoveCourseIsLoading,
} from '@/store/features/coursesSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useCourses() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const userName = useAppSelector((store) => store.user.username)

  const addCourse = useCallback(
    (courseId: string) => {
      if (!userName) {
        alert('Войдите, чтобы добавить курс')
        return
      }

      dispatch(setMoveCourseIsLoading(true))

      addUserCourse(courseId)
        .then(() => {
          return getCourseWorkouts(courseId)
        })
        .then((workouts) => dispatch(addNewUserCourse({ courseId, workouts })))
        .catch((error) => {
          const errorText = handleFetchError(error, dispatch, router)
          if (errorText) alert(errorText)
        })
        .finally(() => {
          dispatch(setMoveCourseIsLoading(false))
        })
    },
    [dispatch, router, userName]
  )

  const removeCourse = useCallback(
    (courseId: string) => {
      dispatch(setMoveCourseIsLoading(true))

      removeUserCourse(courseId)
        .then(() => {
          dispatch(removeNewUserCourse(courseId))
        })
        .catch((error) => {
          const errorText = handleFetchError(error, dispatch, router)
          if (errorText) alert(errorText)
        })
        .finally(() => {
          dispatch(setMoveCourseIsLoading(false))
        })
    },
    [dispatch, router]
  )

  return { addCourse, removeCourse }
}

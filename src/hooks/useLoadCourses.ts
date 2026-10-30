import {
  getAllCourses,
  getCourseWorkouts,
  getUserInfo,
} from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import {
  addNewUserCourse,
  setAllCourses,
  setFetchIsLoading,
  setUserCoursesIsLoading,
  setUserCoursesLoaded,
} from '@/store/features/coursesSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useProgress } from './useProgress'

export function useLoadCourses() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loadUserProgress } = useProgress()

  const loadAllCourses = useCallback(() => {
    dispatch(setFetchIsLoading(true))

    getAllCourses()
      .then((res) => {
        dispatch(setAllCourses(res))
      })
      .catch((error) => {
        const errorText = handleFetchError(error, dispatch, router)
        toast.error(errorText)
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false))
      })
  }, [dispatch, router])

  const loadUserCourses = useCallback(async () => {
    dispatch(setUserCoursesIsLoading(true))

    try {
      const { user } = await getUserInfo()

      await Promise.all(
        user.selectedCourses.map(async (courseId) => {
          const workouts = await getCourseWorkouts(courseId)
          dispatch(addNewUserCourse({ courseId, workouts }))
          await loadUserProgress(courseId)
        })
      )

      dispatch(setUserCoursesLoaded(true))
    } catch (error) {
      const errorText = handleFetchError(error, dispatch, router)

      if (errorText) {
        toast.error(errorText)
        dispatch(setUserCoursesLoaded(true))
      }
    } finally {
      dispatch(setUserCoursesIsLoading(false))
    }
  }, [dispatch, router, loadUserProgress])

  return { loadAllCourses, loadUserCourses }
}

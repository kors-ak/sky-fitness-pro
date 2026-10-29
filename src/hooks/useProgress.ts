import {
  addUserWorkoutProgress,
  getUserCourseProgress,
  removeUserCourseProgress,
  removeUserWorkoutProgress,
} from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import {
  setCourseProgressLoading,
  setUserProgress,
} from '@/store/features/coursesSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export function useProgress() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const loadUserProgress = useCallback(
    async (id: string) => {
      dispatch(setCourseProgressLoading({ id, isLoading: true }))

      try {
        const progress = await getUserCourseProgress(id)
        if ('workoutsProgress' in progress) {
          dispatch(setUserProgress(progress))
        } else {
          const emptyProgress: CourseProgress = {
            courseId: id,
            courseCompleted: false,
            workoutsProgress: [],
          }
          dispatch(setUserProgress(emptyProgress))
        }
      } catch (error) {
        const errorText = handleFetchError(error, dispatch, router)
        toast.error(errorText)
      } finally {
        dispatch(setCourseProgressLoading({ id, isLoading: false }))
      }
    },
    [dispatch, router]
  )

  const removeCourseProgress = useCallback(
    async (courseId: string) => {
      dispatch(setCourseProgressLoading({ id: courseId, isLoading: true }))

      try {
        await removeUserCourseProgress(courseId)
        await loadUserProgress(courseId)
      } catch (error) {
        const errorText = handleFetchError(error, dispatch, router)
        toast.error(errorText)
      } finally {
        dispatch(setCourseProgressLoading({ id: courseId, isLoading: false }))
      }
    },
    [dispatch, router, loadUserProgress]
  )

  const removeWorkoutProgress = useCallback(
    async (courseId: string, workoutId: string) => {
      dispatch(setCourseProgressLoading({ id: courseId, isLoading: true }))

      try {
        await removeUserWorkoutProgress(courseId, workoutId)
        await loadUserProgress(courseId)
      } catch (error) {
        const errorText = handleFetchError(error, dispatch, router)
        toast.error(errorText)
      } finally {
        dispatch(setCourseProgressLoading({ id: courseId, isLoading: false }))
      }
    },
    [dispatch, router, loadUserProgress]
  )

  const saveWorkoutProgress = useCallback(
    async (
      courseId: string,
      workoutId: string,
      progressData: number[]
    ): Promise<boolean> => {
      dispatch(setCourseProgressLoading({ id: courseId, isLoading: true }))

      try {
        await addUserWorkoutProgress(courseId, workoutId, progressData)
        await loadUserProgress(courseId)
        return true
      } catch (error) {
        const errorText = handleFetchError(error, dispatch, router)
        toast.error(errorText)
        return false
      } finally {
        dispatch(setCourseProgressLoading({ id: courseId, isLoading: false }))
      }
    },
    [dispatch, router, loadUserProgress]
  )

  return {
    loadUserProgress,
    removeCourseProgress,
    removeWorkoutProgress,
    saveWorkoutProgress,
  }
}

import { getCourseWorkouts, getUserCourseProgress } from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import {
  addUserCourseWorkouts,
  setCourseProgressLoading,
  setUserProgress,
} from '@/store/features/coursesSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useProgress() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const loadCourseProgress = useCallback(
    async (id: string) => {
      dispatch(setCourseProgressLoading({ id, isLoading: true }))

      try {
        const workouts = await getCourseWorkouts(id)
        dispatch(addUserCourseWorkouts({ id, workouts }))

        const progress = await getUserCourseProgress(id)
        dispatch(setUserProgress(progress))
      } catch (error) {
        console.error(`Ошибка загрузки курса ${id}:`, error)

        const errorText = handleFetchError(error, dispatch, router)
        alert(errorText)
      } finally {
        dispatch(setCourseProgressLoading({ id, isLoading: false }))
      }
    },
    [dispatch, router]
  )

  return { loadCourseProgress }
}

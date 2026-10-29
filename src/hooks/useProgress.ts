import { getUserCourseProgress } from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import {
  setCourseProgressLoading,
  setUserProgress,
} from '@/store/features/coursesSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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
            workoutsProgress: [
              {
                workoutId: '',
                workoutCompleted: false,
                progressData: [],
              },
            ],
          }
          dispatch(setUserProgress(emptyProgress))
        }
      } catch (error) {
        console.error(`Ошибка загрузки прогресса по курсу ${id}:`, error)
        const errorText = handleFetchError(error, dispatch, router)
        alert(errorText)
      } finally {
        dispatch(setCourseProgressLoading({ id, isLoading: false }))
      }
    },
    [dispatch, router]
  )

  return { loadUserProgress }
}

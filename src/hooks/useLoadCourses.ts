import { getAllCourses, getUserInfo } from '@/services/apiCourses'
import { handleFetchError } from '@/services/errorHandling'
import {
  setAllCourses,
  setFetchError,
  setFetchIsLoading,
  setUserCourses,
  setUserCoursesError,
  setUserCoursesIsLoading,
} from '@/store/features/coursesSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useLoadCourses() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loadAllCourses = useCallback(() => {
    dispatch(setFetchError(''))
    dispatch(setFetchIsLoading(true))

    getAllCourses()
      .then((res) => {
        dispatch(setAllCourses(res))
      })
      .catch((error) => {
        const errorText = handleFetchError(error, dispatch, router)
        dispatch(setFetchError(errorText))
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false))
      })
  }, [dispatch, router])

  const loadUserCourses = useCallback(() => {
    dispatch(setUserCoursesError(''))
    dispatch(setUserCoursesIsLoading(true))

    getUserInfo()
      .then((data) => {
        dispatch(setUserCourses(data.user.selectedCourses))
      })
      .catch((error) => {
        const errorText = handleFetchError(error, dispatch, router)
        if (errorText) {
          alert(errorText)
          dispatch(setUserCoursesError(errorText))
        }
      })
      .finally(() => {
        dispatch(setUserCoursesIsLoading(false))
      })
  }, [dispatch, router])

  return { loadAllCourses, loadUserCourses }
}

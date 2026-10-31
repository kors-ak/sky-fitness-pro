'use client'

import { useLoadCourses } from '@/hooks/useLoadCourses'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export default function CoursesInitializer() {
  const allCourses = useAppSelector((state) => state.courses.allCourses)
  const isUserCoursesLoaded = useAppSelector(
    (state) => state.courses.isUserCoursesLoaded
  )
  const username = useAppSelector((state) => state.user.username)
  const { loadAllCourses, loadUserCourses } = useLoadCourses()

  useEffect(() => {
    if (!allCourses.length) {
      loadAllCourses()
    }
  }, [allCourses.length, loadAllCourses])

  useEffect(() => {
    if (username && allCourses.length > 0 && !isUserCoursesLoaded) {
      loadUserCourses()
    }
  }, [username, allCourses.length, isUserCoursesLoaded, loadUserCourses])

  return null
}

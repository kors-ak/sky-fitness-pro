'use client'

import { useLoadCourses } from '@/hooks/useLoadCourses'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export default function CoursesInitializer() {
  const allCourses = useAppSelector((state) => state.courses.allCourses)
  const userCourses = useAppSelector((state) => state.courses.userCourses)
  const username = useAppSelector((state) => state.user.username)
  const { loadAllCourses, loadUserCourses } = useLoadCourses()

  useEffect(() => {
    if (!allCourses.length) {
      loadAllCourses()
    }
  }, [allCourses.length, loadAllCourses])

  useEffect(() => {
    if (!userCourses.length && username) {
      loadUserCourses()
    }
  }, [userCourses.length, username, loadUserCourses])

  return null
}

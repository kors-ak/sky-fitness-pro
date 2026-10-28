'use client'

import { useProgress } from '@/hooks/useProgress'
import { useAppSelector } from '@/store/hooks'
import { useEffect, useRef } from 'react'

type ProgressInitializerProps = {
  courseId: string
  enabled?: boolean
}

export default function ProgressInitializer({
  courseId,
  enabled = true,
}: ProgressInitializerProps) {
  const userCourses = useAppSelector((state) => state.courses.userCourses)
  const userProgress = useAppSelector((state) => state.courses.userProgress)

  const { loadCourseWorkouts, loadUserProgress } = useProgress()

  const initializedRef = useRef(new Set<string>())

  const course = userCourses.find(({ _id }) => _id === courseId)

  useEffect(() => {
    if (!enabled || !course) return

    const workoutsLoaded =
      course.workouts.length > 0 &&
      course.workouts.every((workout) => typeof workout !== 'string')

    const hasProgress = userProgress.some(
      (progress) => progress.courseId === courseId
    )

    const initializationKey = `${courseId}`

    if (initializedRef.current.has(initializationKey)) return

    initializedRef.current.add(initializationKey)

    const initialize = async () => {
      try {
        if (!workoutsLoaded) {
          await loadCourseWorkouts(courseId)
        }

        if (!hasProgress) {
          await loadUserProgress(courseId)
        }
      } finally {
        initializedRef.current.delete(initializationKey)
      }
    }

    void initialize()
  }, [
    enabled,
    course,
    courseId,
    userProgress,
    loadCourseWorkouts,
    loadUserProgress,
  ])

  return null
}

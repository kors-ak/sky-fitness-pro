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

  const { loadUserProgress } = useProgress()

  const initializedRef = useRef(new Set<string>())

  const course = userCourses.find(({ _id }) => _id === courseId)

  useEffect(() => {
    if (!enabled || !course) return

    const hasProgress = userProgress.some(
      (progress) => progress.courseId === courseId
    )

    const initializationKey = `${courseId}`

    if (initializedRef.current.has(initializationKey)) return

    initializedRef.current.add(initializationKey)

    const initialize = async () => {
      try {
        if (!hasProgress) {
          await loadUserProgress(courseId)
        }
      } finally {
        initializedRef.current.delete(initializationKey)
      }
    }

    void initialize()
  }, [enabled, course, courseId, userProgress, loadUserProgress])

  return null
}

import { useProgress } from '@/hooks/useProgress'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export function useCourseProgress(courseId: string, enabled: boolean) {
  const userCourses = useAppSelector((state) => state.courses.userCourses)
  const userProgress = useAppSelector((state) => state.courses.userProgress)
  const isLoading = useAppSelector(
    (state) => state.courses.progressLoading[courseId] ?? false
  )

  const { loadCourseWorkouts, loadUserProgress } = useProgress()

  const course = userCourses.find(({ _id }) => _id === courseId)
  const isAdded = Boolean(course)

  useEffect(() => {
    if (!enabled || !course || isLoading) return

    const firstWorkout = course.workouts[0]

    if (course.workouts.length === 0 || typeof firstWorkout === 'string') {
      loadCourseWorkouts(course._id)
    }
  }, [enabled, course, isLoading, loadCourseWorkouts])

  useEffect(() => {
    if (!enabled || !isAdded || isLoading) return

    const hasProgress = userProgress.some((item) => item.courseId === courseId)

    if (!hasProgress) {
      loadUserProgress(courseId)
    }
  }, [enabled, courseId, isAdded, isLoading, userProgress, loadUserProgress])

  const workouts =
    course?.workouts.filter(
      (workout): workout is WorkoutType => typeof workout !== 'string'
    ) ?? []

  const currentProgress = userProgress.find(
    ({ courseId: id }) => id === courseId
  )

  const total = workouts.reduce(
    (sum, workout) =>
      sum +
      (workout.exercises ?? []).reduce(
        (exerciseSum, exercise) => exerciseSum + exercise.quantity,
        0
      ),
    0
  )

  const completed = workouts.reduce((sum, workout) => {
    const workoutProgress = currentProgress?.workoutsProgress?.find(
      ({ workoutId }) => workoutId === workout._id
    )

    return (
      sum +
      (workout.exercises ?? []).reduce(
        (exerciseSum, exercise, index) =>
          exerciseSum +
          Math.min(
            workoutProgress?.progressData?.[index] ?? 0,
            exercise.quantity
          ),
        0
      )
    )
  }, 0)

  const progress =
    total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0

  return { progress, isLoading }
}

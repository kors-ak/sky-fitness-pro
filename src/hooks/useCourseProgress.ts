import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { useAppSelector } from '@/store/hooks'

export function useCourseProgress(courseId: string) {
  const userCourses = useAppSelector((state) => state.courses.userCourses)
  const userProgress = useAppSelector((state) => state.courses.userProgress)
  const isLoading = useAppSelector(
    (state) => state.courses.progressLoading[courseId] ?? false
  )

  const course = userCourses.find(({ _id }) => _id === courseId)

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

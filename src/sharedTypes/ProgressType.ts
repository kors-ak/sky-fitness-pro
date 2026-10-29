export type CourseProgress = {
  courseId: string
  courseCompleted: boolean
  workoutsProgress: WorkoutProgress[]
}

export type WorkoutProgress = {
  workoutId: string
  workoutCompleted: boolean
  progressData: number[]
}

export type EmptyProgress = {
  workoutId: string
}

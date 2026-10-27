export type WorkoutType = {
  _id: string
  name: string
  video: string
  exercises: ExerciseType[]
}

export type ExerciseType = {
  name: string
  quantity: number
  _id: string
}

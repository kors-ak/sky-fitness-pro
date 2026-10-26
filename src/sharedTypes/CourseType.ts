export type CourseType = {
  _id: string
  order: number
  nameRU: string
  nameEN: string
  description: string
  directions: string[]
  fitting: string[]
  difficulty: 'начальный' | 'средний' | 'сложный'
  durationInDays: number
  dailyDurationInMinutes: {
    from: number
    to: number
  }
  workouts: string[]
  __v: number
}

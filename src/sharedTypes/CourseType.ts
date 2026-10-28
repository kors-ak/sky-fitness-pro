import { WorkoutType } from './WorkoutType'

type CourseGeneralInfo = {
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
  __v: number
}

export type CourseType = CourseGeneralInfo & { workouts: string[] }

export type UserCourseType = CourseGeneralInfo & { workouts: WorkoutType[] }

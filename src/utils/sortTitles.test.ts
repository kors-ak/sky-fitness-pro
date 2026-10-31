import { WorkoutType } from '@/sharedTypes/WorkoutType'
import sortTitles from './sortTitles'

describe('sortTitles', () => {
  const createWorkout = (name: string) => ({ name }) as WorkoutType

  it('Сортирует в порядке возрастания', () => {
    const workouts = [
      createWorkout('Тренировка 3'),
      createWorkout('Тренировка 1'),
      createWorkout('Тренировка 2'),
    ]

    const result = sortTitles(workouts)

    expect(result.map((item) => item.name)).toEqual([
      'Тренировка 1',
      'Тренировка 2',
      'Тренировка 3',
    ])
  })

  it('Не сортирует, если нет цифры 1', () => {
    const workouts = [
      createWorkout('Тренировка 3'),
      createWorkout('Тренировка 2'),
    ]

    expect(sortTitles(workouts)).toBe(workouts)
  })

  it('Располагант значения без номера в конце массива', () => {
    const workouts = [
      createWorkout('Тренировка без номера'),
      createWorkout('Тренировка 2'),
      createWorkout('Тренировка 1'),
    ]

    const result = sortTitles(workouts)

    expect(result.map((item) => item.name)).toEqual([
      'Тренировка 1',
      'Тренировка 2',
      'Тренировка без номера',
    ])
  })
})

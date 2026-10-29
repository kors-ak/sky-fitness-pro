import { CourseProgress, EmptyProgress } from '@/sharedTypes/ProgressType'
import { toCourseProgress } from './toCourseProgress'

describe('toCourseProgress', () => {
  it('Возвращает прогресс по курсу', () => {
    const progress = {
      courseId: 'course-1',
      courseCompleted: true,
      workoutsProgress: [],
    } as CourseProgress

    expect(toCourseProgress('course-1', progress)).toBe(progress)
  })

  it('Создает прогресс с пустым массивом, если нет прогресса', () => {
    const progress = {} as EmptyProgress

    expect(toCourseProgress('course-1', progress)).toEqual({
      courseId: 'course-1',
      courseCompleted: false,
      workoutsProgress: [],
    })
  })
})

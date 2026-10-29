import { CourseProgress, EmptyProgress } from '@/sharedTypes/ProgressType'

export const toCourseProgress = (
  courseId: string,
  data: CourseProgress | EmptyProgress
): CourseProgress =>
  'workoutsProgress' in data
    ? data
    : { courseId, courseCompleted: false, workoutsProgress: [] }

import CourseCardSkeleton from '@/components/skeletons/CourseCardSkeleton/CourseCardSkeleton'
import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import CourseCard from '../CourseCard/CourseCard'
import styles from './courseContainer.module.css'

type CourseContainerProps = {
  courses: (CourseType | UserCourseType)[]
  isProfile: boolean
  isLoading?: boolean
  skeletonCount?: number
}

export default function CourseContainer({
  courses,
  isProfile = false,
  isLoading = false,
  skeletonCount = 3,
}: CourseContainerProps) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i}>
            <CourseCardSkeleton isProfileCourse={isProfile} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {courses.length > 0
        ? [...courses]
            .sort((a, b) => a.order - b.order)
            .map((el) => (
              <div key={el._id}>
                <CourseCard course={el} isProfileCourse={isProfile} />
              </div>
            ))
        : 'Список курсов пока пуст'}
    </div>
  )
}

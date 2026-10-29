import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import CourseCard from '../CourseCard/CourseCard'
import styles from './courseContainer.module.css'

type CourseContainerProps = {
  courses: (CourseType | UserCourseType)[]
  isProfile: boolean
}

export default function CourseContainer({
  courses,
  isProfile = false,
}: CourseContainerProps) {
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

import { CourseType } from '@/sharedTypes/CourseType'
import CourseCard from '../CourseCard/CourseCard'
import styles from './courseContainer.module.css'

type CourseContainerProps = {
  courses: CourseType[]
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
              <CourseCard
                course={el}
                key={el._id}
                isProfileCourse={isProfile}
              />
            ))
        : 'Список курсов пока пуст'}
    </div>
  )
}

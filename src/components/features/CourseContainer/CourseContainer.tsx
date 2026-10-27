'use client'

import { CourseType } from '@/sharedTypes/CourseType'
import CourseCard from '../CourseCard/CourseCard'
import styles from './courseContainer.module.css'

type CourseContainerProps = {
  courses: CourseType[]
}

export default function CourseContainer({ courses }: CourseContainerProps) {
  return (
    <div className={styles.container}>
      {[...courses]
        .sort((a, b) => a.order - b.order)
        .map((el) => (
          <CourseCard course={el} key={el._id} />
        ))}
    </div>
  )
}

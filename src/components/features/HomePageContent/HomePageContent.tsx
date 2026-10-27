'use client'

import CourseContainer from '@/components/features/CourseContainer/CourseContainer'
import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'
import { useAppSelector } from '@/store/hooks'
import styles from './homePageContent.module.css'

export default function HomePageContent() {
  const courses = useAppSelector((store) => store.courses.allCourses)

  return (
    <>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className={styles.subtitle}>Измени своё тело за полгода!</div>
        </div>

        {courses.length > 0 && <CourseContainer courses={courses} />}
      </main>

      <ScrollToTop />
    </>
  )
}

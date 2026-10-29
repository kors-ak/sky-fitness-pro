'use client'

import CourseContainer from '@/components/features/CourseContainer/CourseContainer'
import ProfileBlock from '@/components/features/ProfileBlock/ProfileBlock'
import { useAppSelector } from '@/store/hooks'
import styles from './page.module.css'

export default function Profile() {
  const userName = useAppSelector((store) => store.user.username)
  const userEmail = useAppSelector((store) => store.user.email)
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const isCoursesLoading = useAppSelector(
    (store) => store.courses.fetchIsUserCoursesLoading
  )

  return (
    <main className={styles.profile}>
      <section>
        <h1 className={styles.title}>Профиль</h1>
        <ProfileBlock name={userName} email={userEmail} />
      </section>

      <section>
        <h2 className={styles.title}>Мои курсы</h2>
        {(isCoursesLoading || userCourses.length > 0) && (
          <CourseContainer
            courses={userCourses}
            isProfile={true}
            isLoading={isCoursesLoading}
            skeletonCount={3}
          />
        )}
      </section>
    </main>
  )
}

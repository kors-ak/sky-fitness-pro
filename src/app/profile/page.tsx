'use client'

import CourseContainer from '@/components/features/CourseContainer/CourseContainer'
import ProfileBlock from '@/components/features/ProfileBlock/ProfileBlock'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function Profile() {
  const router = useRouter()
  const userName = useAppSelector((store) => store.user.username)
  const userEmail = useAppSelector((store) => store.user.email)
  const isInitialized = useAppSelector((store) => store.user.isInitialized)
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const isCoursesLoading = useAppSelector(
    (store) => store.courses.fetchIsUserCoursesLoading
  )

  useEffect(() => {
    if (isInitialized && !userName) {
      router.replace('/auth/sign-in')
    }
  }, [isInitialized, userName, router])

  if (!userName) return null

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

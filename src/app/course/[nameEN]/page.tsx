'use client'

import StartJourney from '@/components/features/StartJourney/StartJourney'
import ProgressInitializer from '@/components/initialization/ProgressInitializer'
import SelectWorkout from '@/components/popups/SelectWorkout/SelectWorkout'
import CoursePageSkeleton from '@/components/skeletons/CoursePageSkeleton/CoursePageSkeleton'
import { useCourses } from '@/hooks/useCourses'
import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Image, { getImageProps } from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function CoursePage() {
  const { nameEN } = useParams<{ nameEN: string }>()
  const router = useRouter()
  const { addCourse } = useCourses()

  const allCourses = useAppSelector((store) => store.courses.allCourses)
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const isLoading = useAppSelector(
    (store) =>
      store.courses.moveCourseIsLoading ||
      store.courses.fetchIsUserCoursesLoading ||
      store.courses.fetchIsLoading
  )
  const isCoursesLoading = useAppSelector(
    (store) => store.courses.fetchIsLoading
  )
  const userName = useAppSelector((store) => store.user.username)

  const course = allCourses.find(
    (course) => course.nameEN.toLowerCase() === nameEN
  )
  const isUserCourse = userCourses.find(
    (el) => el.nameEN.toLowerCase() === nameEN
  )

  const [isSelectWorkoutOpen, setIsSelectWorkoutOpen] = useState<boolean>(false)
  const handleSelectWorkout = (id: string) => {
    router.push(`/course/${course?.nameEN.toLowerCase()}/workout/${id}`)
  }

  let startJourneyText: string = ''
  let action: () => void = () => null

  if (!userName) {
    startJourneyText = 'Войдите, чтобы добавить курс'
    action = () => router.push('/auth/sign-in')
  } else if (!isUserCourse) {
    startJourneyText = 'Добавить курс'
    if (course) action = () => addCourse(course._id)
  } else {
    startJourneyText = 'Продолжить'
    action = () => setIsSelectWorkoutOpen(true)
  }

  useEffect(() => {
    if (allCourses.length > 0 && !course) {
      router.replace('/not-found')
    }
  }, [course, router, allCourses])

  if (isCoursesLoading || allCourses.length === 0) {
    return <CoursePageSkeleton />
  }

  if (!course) {
    return null
  }

  const common = {
    alt: course.nameRU,
    fill: true,
    sizes: '...',
    className: styles.image,
  }
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...common,
    src: `/images/${course.nameEN.toLowerCase()}-card.jpg`,
  })
  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({
    ...common,
    src: `/images/${course.nameEN.toLowerCase()}-skill.jpg`,
  })

  return (
    <>
      <ProgressInitializer courseId={course._id} enabled={!!isUserCourse} />
      <div className={styles.main_container}>
        <main className={styles.main}>
          <section
            className={cn(styles.hero, styles[course.nameEN.toLowerCase()])}
          >
            <h1 className={styles.title}>{course.nameRU}</h1>

            <picture className={styles.image}>
              <source media="(min-width: 901px)" srcSet={desktop} />
              <source media="(max-width: 900px)" srcSet={mobile} />
              <img {...rest} alt={course.nameRU} />
            </picture>
          </section>

          <section>
            <h2 className={styles.subtitle}>Подойдет для вас, если:</h2>
            <div
              className={cn(styles.fitting, {
                [styles.control]: course.order === 1 || course.order === 3,
              })}
            >
              {course.fitting.map((desc, i) => (
                <div key={i}>
                  <span>{i + 1}</span>
                  {desc}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.subtitle}>Направления</h2>

            <div className={styles.directions}>
              {course.directions.map((direction, i) => (
                <div key={i} className={styles.point}>
                  <Image
                    src={`/icons/sparcle.svg`}
                    alt="Маркер"
                    width={26}
                    height={26}
                  />
                  <p>{direction}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <StartJourney
          btnText={startJourneyText}
          action={action}
          isLoading={isLoading}
        />
      </div>

      {isUserCourse && (
        <SelectWorkout
          isOpen={isSelectWorkoutOpen}
          course={isUserCourse}
          onSelectCourse={() => setIsSelectWorkoutOpen(false)}
          onSelectWorkout={handleSelectWorkout}
        />
      )}
    </>
  )
}

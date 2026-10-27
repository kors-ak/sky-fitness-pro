'use client'

import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function CoursePage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const allCourses = useAppSelector((store) => store.courses.allCourses)
  const course = allCourses.find((course) => course._id === id)

  useEffect(() => {
    if (allCourses.length > 0 && !course) {
      router.replace('/not-found')
    }
  }, [course, router, allCourses])

  if (allCourses.length < 0 || !course) {
    return null
  }

  return (
    <div className={styles.main_container}>
      <main className={styles.main}>
        <section
          className={cn(styles.hero, styles[course.nameEN.toLowerCase()])}
        >
          <h1 className={styles.title}>{course.nameRU}</h1>
          <Image
            className={styles.image}
            src={`/images/${course.nameEN.toLowerCase()}-skill.jpg`}
            alt={course.nameRU}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
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
    </div>
  )
}

'use client'

import { useCourseProgress } from '@/hooks/useCourseProgress'
import { useCourses } from '@/hooks/useCourses'
import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SelectWorkout from '../SelectWorkout/SelectWorkout'
import styles from './courseCard.module.css'

type CourseCardProps = {
  course: CourseType | UserCourseType
  isProfileCourse: boolean
}

export default function CourseCard({
  course,
  isProfileCourse = false,
}: CourseCardProps) {
  const router = useRouter()
  const isLoading = useAppSelector((store) => store.courses.moveCourseIsLoading)
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const isAdded = userCourses.some((el) => el._id === course._id)

  const { addCourse, removeCourse } = useCourses()
  const { progress, isLoading: isProgressLoading } = useCourseProgress(
    course._id,
    isProfileCourse
  )

  const [isSelectWorkoutOpen, setIsSelectWorkoutOpen] = useState<boolean>(false)

  const handleProgressBtnAction = () => {
    if (progress === 100) {
      console.log('Удалить прогресс')
    } else {
      setIsSelectWorkoutOpen(true)
    }
  }

  const handleToggleCourse = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (isAdded) {
      removeCourse(course._id)
    } else {
      addCourse(course._id)
    }
  }

  const handleSelectWorkout = (id: string) => {
    router.push(`/course/${course.nameEN.toLowerCase()}/workout/${id}`)
  }

  const dailyDuration = `${course.dailyDurationInMinutes.from}-${course.dailyDurationInMinutes.to}`
  const difficultyLevel =
    course.difficulty === 'начальный'
      ? 'light'
      : course.difficulty === 'средний'
        ? 'medium'
        : 'hard'
  const btnText =
    progress === 100
      ? 'Начать заново'
      : progress > 0
        ? 'Продолжить'
        : 'Начать тренировки'

  return (
    <article
      className={styles.card}
      onClick={() => router.push(`/course/${course.nameEN.toLowerCase()}`)}
    >
      <div
        className={cn(
          styles.image_container,
          styles[course.nameEN.toLowerCase()]
        )}
      >
        <Image
          className={styles.image}
          src={`/images/${course.nameEN.toLowerCase()}-card.jpg`}
          alt={course.nameRU}
          fill
          sizes="(max-width: 375px) 343px, 360px"
          loading={
            [1, 2, 3].find((el) => el === course.order) ? 'eager' : 'lazy'
          }
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>{course.nameRU}</h2>

        <div className={styles.info}>
          <div className={styles.tag}>
            <Image
              src="/icons/calendar.svg"
              alt="Длительность в днях"
              width={18}
              height={18}
            />
            <p>{course.durationInDays} дней</p>
          </div>

          <div className={styles.tag}>
            <Image
              src="/icons/time.svg"
              alt="Нагрузка в день"
              width={18}
              height={18}
            />
            <p>{dailyDuration} мин/день</p>
          </div>

          <div className={styles.tag}>
            <Image
              src={`/icons/difficulty-${difficultyLevel}.svg`}
              alt={course.difficulty}
              width={18}
              height={18}
            />
            <p>Сложность</p>
          </div>
        </div>

        {isProfileCourse && (
          <div className={styles.progress_container}>
            {isProgressLoading ? (
              <p className={styles.progress_text}>Загрузка прогресса...</p>
            ) : (
              <>
                <p className={styles.progress_text}>Прогресс {progress}%</p>
                <div className={styles.progress}>
                  <div
                    className={styles.progress_bar}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  className={styles.progress_btn}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProgressBtnAction()
                  }}
                >
                  {btnText}
                </button>

                <SelectWorkout
                  isOpen={isSelectWorkoutOpen}
                  items={course.workouts as WorkoutType[]}
                  onSelectCourse={() => setIsSelectWorkoutOpen(false)}
                  onSelectWorkout={handleSelectWorkout}
                />
              </>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        title={isAdded ? 'Удалить курс' : 'Добавить курс'}
        className={styles.circleBtn}
        disabled={isLoading}
        onClick={handleToggleCourse}
      >
        <Image
          src={isAdded ? '/icons/circle-remove.svg' : '/icons/circle-add.svg'}
          alt={isAdded ? 'Удалить курс' : 'Добавить курс'}
          width={32}
          height={32}
        />
      </button>
    </article>
  )
}

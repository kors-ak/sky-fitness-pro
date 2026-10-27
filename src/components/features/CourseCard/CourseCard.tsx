import { CourseType } from '@/sharedTypes/CourseType'
import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Image from 'next/image'
import styles from './courseCard.module.css'

type CourseCardProps = {
  course: CourseType
}

export default function CourseCard({ course }: CourseCardProps) {
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const isAdded = userCourses.find((el) => el._id === course._id)
  const dailyDuration = `${course.dailyDurationInMinutes.from}-${course.dailyDurationInMinutes.to}`
  const difficultyLevel =
    course.difficulty === 'начальный'
      ? 'light'
      : course.difficulty === 'средний'
        ? 'medium'
        : 'hard'

  return (
    <article className={styles.card}>
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
      </div>

      {isAdded ? (
        <button title="Удалить курс" className={styles.circleBtn}>
          <Image
            src="/icons/circle-remove.svg"
            alt="Удалить курс"
            width={32}
            height={32}
          />
        </button>
      ) : (
        <button title="Добавить курс" className={styles.circleBtn}>
          <Image
            src="/icons/circle-add.svg"
            alt="Добавить курс"
            width={32}
            height={32}
          />
        </button>
      )}
    </article>
  )
}

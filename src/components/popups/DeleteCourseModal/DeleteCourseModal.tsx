import { useCourses } from '@/hooks/useCourses'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import cn from 'classnames'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styles from './deleteCourseModal.module.css'

type PropsType = {
  changeIsOpen: Dispatch<SetStateAction<boolean>>
  id: string
  name: string
}

export default function DeleteCourseModal({
  changeIsOpen,
  id,
  name,
}: PropsType) {
  const { removeCourse } = useCourses()
  useEscapeKey(() => changeIsOpen(false))

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        event.stopPropagation()
        changeIsOpen(false)
      }}
    >
      <div
        className={styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.text}>Удалить курс «{name}»?</p>
        <p className={styles.description}>
          Весь прогресс по этому курсу будет утерян
        </p>
        <div className={styles.buttons}>
          <button
            className={cn(styles.btn, styles.stay)}
            onClick={(event) => {
              event.stopPropagation()
              changeIsOpen(false)
            }}
          >
            Оставить курс
          </button>
          <button
            className={cn(styles.btn, styles.logout)}
            onClick={(event) => {
              event.stopPropagation()
              changeIsOpen(false)
              removeCourse(id)
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

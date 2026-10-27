import { resetCourseSlice } from '@/store/features/coursesSlice'
import { clearUserData } from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styles from './exitModal.module.css'

type PropsType = {
  changeIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ExitModal({ changeIsOpen }: PropsType) {
  const router = useRouter()
  const dispatch = useAppDispatch()

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
        <p className={styles.text}>Вы уверены, что хотите выйти?</p>

        <div className={styles.buttons}>
          <button
            className={cn(styles.btn, styles.stay)}
            onClick={(event) => {
              event.stopPropagation()
              changeIsOpen(false)
            }}
          >
            Остаться
          </button>
          <button
            className={cn(styles.btn, styles.logout)}
            onClick={(event) => {
              event.stopPropagation()
              changeIsOpen(false)
              dispatch(clearUserData())
              dispatch(resetCourseSlice())
              router.replace('/auth/sign-in')
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

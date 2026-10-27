import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import styles from './userInfo.module.css'

type PropsType = {
  isOpen: boolean
  changeIsOpen: Dispatch<SetStateAction<boolean>>
  setIsExitOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserInfo({
  isOpen,
  changeIsOpen,
  setIsExitOpen,
}: PropsType) {
  const userName = useAppSelector((state) => state.user.username)
  const userEmail = useAppSelector((state) => state.user.email)

  return (
    <>
      {isOpen && (
        <div className={styles.user} onClick={(e) => e.stopPropagation()}>
          <div className={styles.wrapper}>
            <p className={cn(styles.text)}>{userName}</p>
            <p className={cn(styles.text, styles.email)}>{userEmail}</p>
          </div>

          <div className={styles.wrapper}>
            <Link
              href={'/profile'}
              className={cn(styles.btn, styles.profile)}
              onClick={(event) => {
                event.stopPropagation()
                changeIsOpen(false)
              }}
            >
              Мой профиль
            </Link>
            <button
              className={cn(styles.btn, styles.logout)}
              onClick={(event) => {
                event.stopPropagation()
                changeIsOpen(false)
                setIsExitOpen(true)
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </>
  )
}

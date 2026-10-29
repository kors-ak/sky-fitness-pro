'use client'

import ExitModal from '@/components/popups/ExitModal/ExitModal'
import UserInfo from '@/components/popups/UserInfo/UserInfo'
import { useAppSelector } from '@/store/hooks'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './userBlock.module.css'

export default function UserBlock() {
  const userName = useAppSelector((state) => state.user.username)
  const userBlockRef = useRef<HTMLDivElement>(null)

  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false)
  const [isExitOpen, setIsExitOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userBlockRef.current &&
        !userBlockRef.current.contains(event.target as Node)
      ) {
        setIsUserInfoOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className={styles.userWrapper} ref={userBlockRef}>
        <div
          className={styles.user}
          onClick={() => setIsUserInfoOpen((prev) => !prev)}
        >
          <Image
            src="/icons/user-mini.svg"
            alt="фото профиля"
            width={42}
            height={42}
          />

          <button className={styles.user__info}>{userName}</button>
        </div>
        <UserInfo
          isOpen={isUserInfoOpen}
          changeIsOpen={setIsUserInfoOpen}
          setIsExitOpen={setIsExitOpen}
        />
      </div>

      {isExitOpen && <ExitModal changeIsOpen={setIsExitOpen} />}
    </>
  )
}

'use client'

import UserInfo from '@/components/popups/UserInfo/UserInfo'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './userBlock.module.css'

export default function UserBlock() {
  const userName = 'Сергей'

  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false)

  const userBlockRef = useRef<HTMLDivElement>(null)

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
    <div
      ref={userBlockRef}
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

      <UserInfo isOpen={isUserInfoOpen} changeIsOpen={setIsUserInfoOpen} />
    </div>
  )
}

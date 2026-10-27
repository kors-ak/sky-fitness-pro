'use client'

import { useAppSelector } from '@/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserBlock from '../UserBlock/UserBlock'
import styles from './header.module.css'

export default function Header() {
  const router = useRouter()
  const username = useAppSelector((state) => state.user.username)

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/" aria-label="SkyFitnessPro — главная">
          <Image
            src="/logo.svg"
            alt="SkyFitnessPro"
            width={220}
            height={35}
            priority
          />
        </Link>
        <p className={styles.header__description}>
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      {username ? (
        <UserBlock />
      ) : (
        <button
          className={styles.header__button}
          onClick={() => router.push('/auth/sign-in')}
        >
          Войти
        </button>
      )}
    </header>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import UserBlock from '../UserBlock/UserBlock'
import styles from './header.module.css'

export default function Header() {
  const isAuth = true

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/" aria-label="SkyFitnessPro — главная">
          <Image
            src="logo.svg"
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
      {isAuth ? (
        <UserBlock />
      ) : (
        <button className={styles.header__button}>Войти</button>
      )}
    </header>
  )
}

import ExitModal from '@/components/popups/ExitModal/ExitModal'
import Image from 'next/image'
import { useState } from 'react'
import styles from './ProfileBlock.module.css'

type ProfileBlockProps = {
  name: string
  email: string
}

export default function ProfileBlock({ name, email }: ProfileBlockProps) {
  const [isExitOpen, setIsExitOpen] = useState<boolean>(false)

  return (
    <div className={styles.profile}>
      <Image
        src="/icons/user-profile.svg"
        alt="Фото профиля"
        width={197}
        height={197}
        priority
      />

      <div className={styles.content}>
        <div className={styles.info}>
          <h2>{name}</h2>
          <p>Логин: {email}</p>
        </div>

        <button
          className={styles.btn}
          onClick={() => {
            setIsExitOpen(true)
          }}
        >
          Выйти
        </button>
      </div>

      {isExitOpen && <ExitModal changeIsOpen={setIsExitOpen} />}
    </div>
  )
}

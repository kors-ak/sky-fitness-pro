import Image from 'next/image'
import styles from './success.module.css'

export default function Success() {
  return (
    <div className={styles.overlay}>
      <div className={styles.block}>
        <h3 className={styles.title}>Ваш прогресс засчитан!</h3>
        <Image
          src={`/icons/check-done.svg`}
          alt=""
          width={68}
          height={68}
          priority
        />
      </div>
    </div>
  )
}

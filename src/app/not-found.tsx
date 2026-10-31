import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.code}>404</div>

        <h1 className={styles.title}>
          Страница не найдена <span aria-hidden="true">😢</span>
        </h1>

        <p className={styles.subtitle}>
          Возможно, она была удалена
          <br />
          или перенесена на другой адрес
        </p>

        <Link href="/" className={styles.button}>
          Вернуться на главную
        </Link>
      </section>
    </div>
  )
}

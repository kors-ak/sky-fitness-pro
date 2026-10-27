import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'
import CoursesInitializer from '@/components/initialization/CoursesInitializer'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <CoursesInitializer />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className={styles.subtitle}>Измени своё тело за полгода!</div>
        </div>

        <ScrollToTop />
      </main>
    </>
  )
}

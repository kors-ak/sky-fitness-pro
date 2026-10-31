import Skeleton from '../Skeleton'
import styles from './coursePageSkeleton.module.css'

export default function CoursePageSkeleton() {
  return (
    <div
      className={styles.main_container}
      role="status"
      aria-busy="true"
      aria-label="Загрузка курса"
    >
      <div className={styles.main}>
        <Skeleton className={styles.hero} />

        <section>
          <Skeleton className={styles.subtitle} />
          <div className={styles.fitting}>
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className={styles.fitting_item} />
            ))}
          </div>
        </section>

        <section>
          <Skeleton className={styles.subtitle} />
          <Skeleton className={styles.directions} />
        </section>
      </div>
    </div>
  )
}

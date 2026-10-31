import Skeleton from '../Skeleton'
import styles from './workouPagetSkeleton.module.css'

export default function WorkoutSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Загрузка тренировки">
      <Skeleton className={styles.title} />
      <Skeleton className={styles.video} />

      <div className={styles.progress}>
        <Skeleton className={styles.progress_title} />
        <div className={styles.list}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={styles.row}>
              <Skeleton className={styles.row_text} />
              <Skeleton className={styles.row_bar} />
            </div>
          ))}
        </div>
        <Skeleton className={styles.btn} />
      </div>
    </div>
  )
}

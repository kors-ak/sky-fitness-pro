import { WorkoutProgress } from '@/sharedTypes/ProgressType'
import { ExerciseType } from '@/sharedTypes/WorkoutType'
import { cutAfterBracket } from '@/utils/cutAfterBracket '
import styles from './workoutProgress.module.css'

type WorkoutProgressProps = {
  index: number
  exercises: ExerciseType[]
  progress?: WorkoutProgress
}

export default function WorkoutProgressBlock({
  index,
  exercises,
  progress,
}: WorkoutProgressProps) {
  return (
    <div className={styles.exercises}>
      <h2 className={styles.title}>Упражнения тренировки {index + 1}</h2>

      <div className={styles.progress_container}>
        {exercises.map((el, i) => {
          const done = progress?.progressData[i] ?? 0
          const percent =
            el.quantity > 0
              ? Math.min(100, Math.round((done / el.quantity) * 100))
              : 0

          return (
            <div key={el._id} className={styles.progress_wrapper}>
              <p className={styles.progress_text}>
                {cutAfterBracket(el.name)} {percent}%
              </p>
              <div className={styles.progress}>
                <div
                  className={styles.progress_bar}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <button></button>
    </div>
  )
}

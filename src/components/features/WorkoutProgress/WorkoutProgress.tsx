import { WorkoutProgress } from '@/sharedTypes/ProgressType'
import styles from './workoutProgress.module.css'

type WorkoutProgressProps = {
  userProgress: WorkoutProgress
}

export default function WorkoutProgressBlock({
  userProgress,
}: WorkoutProgressProps) {
  return (
    <div className={styles.exercises}>
      <div></div>
    </div>
  )
}

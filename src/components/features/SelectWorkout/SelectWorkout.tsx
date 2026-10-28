import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { useEffect } from 'react'
import SelectItem from '../SelectItem/SelectItem'
import styles from './selectWorkout.module.css'

type SelectWorkoutProps = {
  isOpen: boolean
  items: WorkoutType[]
  onSelectCourse: () => void
  onSelectWorkout: (name: string) => void
}

export default function SelectWorkout({
  isOpen,
  items,
  onSelectCourse,
  onSelectWorkout,
}: SelectWorkoutProps) {
  useEffect(() => {
    if (isOpen) document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  return (
    isOpen && (
      <div
        className={styles.overlay}
        onClick={(e) => {
          e.stopPropagation()
          onSelectCourse()
        }}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>Выберите тренировку</h2>
          <ul className={styles.list}>
            {items.map((item) => (
              <SelectItem
                key={item._id}
                item={item}
                onSelectWorkout={onSelectWorkout}
              />
            ))}
            <button className={styles.btn}>Начать</button>
          </ul>
        </div>
      </div>
    )
  )
}

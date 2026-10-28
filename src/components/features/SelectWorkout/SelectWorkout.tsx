'use client'

import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { useAppSelector } from '@/store/hooks'
import sortTitles from '@/utils/sortTitles'
import { useEffect, useState } from 'react'
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

  const generalProgress = useAppSelector((store) => store.courses.userProgress)
  const [selectedWorkout, setSelectedWorkout] = useState<string>('')
  const toggleSelectedWorkout = (id: string) =>
    selectedWorkout === id ? setSelectedWorkout('') : setSelectedWorkout(id)

  return (
    isOpen && (
      <div
        className={styles.overlay}
        onClick={(e) => {
          e.stopPropagation()
          onSelectCourse()
        }}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.title}>Выберите тренировку</h2>
          <ul className={styles.list}>
            {sortTitles([...items]).map((item) => (
              <SelectItem
                key={item._id}
                item={item}
                generalProgress={generalProgress}
                isSelected={item._id === selectedWorkout}
                onClick={() => toggleSelectedWorkout(item._id)}
              />
            ))}
          </ul>
          <button
            className={styles.btn}
            disabled={!selectedWorkout}
            onClick={() => onSelectWorkout(selectedWorkout)}
          >
            Начать
          </button>
        </div>
      </div>
    )
  )
}

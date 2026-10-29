'use client'

import { UserCourseType } from '@/sharedTypes/CourseType'
import { useAppSelector } from '@/store/hooks'
import sortTitles from '@/utils/sortTitles'
import { useEffect, useState } from 'react'
import SelectItem from '../../features/SelectItem/SelectItem'
import styles from './selectWorkout.module.css'

type SelectWorkoutProps = {
  isOpen: boolean
  course: UserCourseType
  onSelectCourse: () => void
  onSelectWorkout: (name: string) => void
}

export default function SelectWorkout({
  isOpen,
  course,
  onSelectCourse,
  onSelectWorkout,
}: SelectWorkoutProps) {
  useEffect(() => {
    if (isOpen) document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])
  const courseProgress = useAppSelector(
    (store) => store.courses.userProgress
  ).find((el) => el.courseId === course._id)
  const workoutsProgress = courseProgress?.workoutsProgress ?? []
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
            {sortTitles([...course.workouts]).map((item) => (
              <SelectItem
                key={item._id}
                item={item}
                userProgress={workoutsProgress.find(
                  (el) => el.workoutId === item._id
                )}
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

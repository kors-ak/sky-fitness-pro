'use client'

import VideoPlayer from '@/components/features/VideoPlayer/VideoPlayer'
import WorkoutProgressBlock from '@/components/features/WorkoutProgress/WorkoutProgress'
import ProgressInitializer from '@/components/initialization/ProgressInitializer'
import { useProgress } from '@/hooks/useProgress'
import { useAppSelector } from '@/store/hooks'
import sortTitles from '@/utils/sortTitles'
import { useParams } from 'next/navigation'
import styles from './page.module.css'

export default function Workout() {
  const { nameEN, id } = useParams<{ nameEN: string; id: string }>()
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const userProgress = useAppSelector((store) => store.courses.userProgress)
  const course = userCourses?.find((el) => el.nameEN.toLowerCase() === nameEN)
  const sortedWorkouts = sortTitles(course?.workouts ?? [])
  const workoutIndex = sortedWorkouts.findIndex((el) => el._id === id)
  const workout = course?.workouts.find((el) => el._id === id)
  const workoutProgress = userProgress
    .find((el) => el.courseId === course?._id)
    ?.workoutsProgress.find((el) => el.workoutId === id)
  const { saveWorkoutProgress, removeWorkoutProgress } = useProgress()
  const isLoading = useAppSelector(
    (s) => s.courses.progressLoading[course?._id ?? ''] ?? false
  )

  if (!course || !workout) {
    return <ProgressInitializer courseId={course?._id || ''} />
  }

  return (
    <>
      <ProgressInitializer courseId={course?._id || ''} />
      <div>
        <h1 className={styles.title}>{course?.nameRU}</h1>

        {workout?.video && <VideoPlayer url={workout.video} />}

        <WorkoutProgressBlock
          index={workoutIndex}
          exercises={workout.exercises}
          progress={workoutProgress}
          isLoading={isLoading}
          onSave={(progressData) =>
            saveWorkoutProgress(course._id, workout._id, progressData)
          }
          onReset={() => removeWorkoutProgress(course._id, workout._id)}
        />
      </div>
    </>
  )
}

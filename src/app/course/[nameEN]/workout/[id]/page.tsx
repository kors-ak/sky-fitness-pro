'use client'

import VideoPlayer from '@/components/features/VideoPlayer/VideoPlayer'
import WorkoutProgress from '@/components/features/WorkoutProgress/WorkoutProgress'
import ProgressInitializer from '@/components/initialization/ProgressInitializer'
import { useAppSelector } from '@/store/hooks'
import { useParams } from 'next/navigation'
import styles from './page.module.css'

export default function Workout() {
  const { nameEN, id } = useParams<{ nameEN: string; id: string }>()
  const userCourses = useAppSelector((store) => store.courses.userCourses)
  const course = userCourses?.find((el) => el.nameEN.toLowerCase() === nameEN)
  const workout = course?.workouts.find((el) => el._id === id)
  const userProgressList = useAppSelector((store) => store.courses.userProgress)
  const courseProgress = userProgressList?.find(
    (el) => el.courseId === course?._id
  )
  const userProgress = courseProgress?.workoutsProgress?.find(
    (el) => el.workoutId === id
  )

  return (
    <div>
      <ProgressInitializer courseId={course?._id || ''} />
      <h1 className={styles.title}>{course?.nameRU}</h1>

      {workout?.video && <VideoPlayer url={workout.video} />}

      {userProgress && <WorkoutProgress userProgress={userProgress} />}
    </div>
  )
}

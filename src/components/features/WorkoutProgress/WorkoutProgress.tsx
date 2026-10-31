import Success from '@/components/popups/Success/Success'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { WorkoutProgress } from '@/sharedTypes/ProgressType'
import { ExerciseType } from '@/sharedTypes/WorkoutType'
import { cutAfterBracket } from '@/utils/cutAfterBracket'
import { useEffect, useState } from 'react'
import styles from './workoutProgress.module.css'

type WorkoutProgressProps = {
  index: number
  exercises: ExerciseType[]
  progress?: WorkoutProgress
  isLoading?: boolean
  onSave: (progressData: number[]) => Promise<boolean>
  onReset: () => void
}

export default function WorkoutProgressBlock({
  index,
  exercises,
  progress,
  isLoading,
  onSave,
  onReset,
}: WorkoutProgressProps) {
  const totalRequired = exercises.reduce((sum, el) => sum + el.quantity, 0)

  const totalDone = exercises.reduce((sum, el, i) => {
    const done = progress?.progressData?.[i] ?? 0
    return sum + Math.min(done, el.quantity)
  }, 0)

  const workoutPercent =
    totalRequired > 0 ? Math.round((totalDone / totalRequired) * 100) : 0

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEscapeKey(() => setIsFormOpen(false), isFormOpen)

  useEffect(() => {
    if (!isSuccess) return

    const timer = setTimeout(() => setIsSuccess(false), 1200)
    return () => clearTimeout(timer)
  }, [isSuccess])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const progressData = exercises.map((el, i) => {
      const previous = progress?.progressData?.[i] ?? 0
      const added = Math.max(0, Math.floor(Number(formData.get(el._id)) || 0))

      return Math.min(previous + added, el.quantity)
    })

    const isSaved = await onSave(progressData)

    if (isSaved) {
      setIsFormOpen(false)
      setIsSuccess(true)
    }
  }

  const btnAction = workoutPercent < 100 ? () => setIsFormOpen(true) : onReset

  const btnText =
    workoutPercent === 0
      ? 'Заполнить свой прогресс'
      : workoutPercent === 100
        ? 'Сбросить свой прогресс'
        : 'Обновить свой прогресс'

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
                {cutAfterBracket(el.name)}&nbsp;{percent}%
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

      <button className={styles.btn} onClick={btnAction} disabled={isLoading}>
        {btnText}
      </button>

      {isFormOpen && (
        <div className={styles.overlay} onClick={() => setIsFormOpen(false)}>
          <form
            className={styles.form}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2 className={styles.heading}>Мой прогресс</h2>

            <div className={styles.form_list}>
              {exercises.map((el) => (
                <div key={el._id}>
                  <label htmlFor={el._id} className={styles.question}>
                    Сколько раз вы сделали{' '}
                    {cutAfterBracket(el.name).toLowerCase()}?
                  </label>
                  <input
                    className={styles.input}
                    type="number"
                    name={el._id}
                    id={el._id}
                    min={0}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            <button
              className={styles.form_btn}
              type="submit"
              disabled={isLoading}
            >
              Сохранить
            </button>
          </form>
        </div>
      )}

      {isSuccess && <Success />}
    </div>
  )
}

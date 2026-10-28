import { CourseProgress } from '@/sharedTypes/ProgressType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import parseTitle from '@/utils/parseTitle'
import cn from 'classnames'
import Image from 'next/image'
import styles from './selectItem.module.css'

type SelectItemProps = {
  item: WorkoutType
  onClick: (name: string) => void
  generalProgress: CourseProgress[]
  isSelected: boolean
}

export default function SelectItem({
  item,
  onClick,
  generalProgress,
  isSelected,
}: SelectItemProps) {
  const isDone = generalProgress.find(
    (el) => el.courseId === item._id
  )?.courseCompleted

  return (
    <li
      className={cn(styles.item, { [styles.selected]: isSelected })}
      onClick={() => onClick(item._id)}
    >
      <Image
        src={`/icons/check-${isDone ? 'done' : 'progress'}.svg`}
        alt={isDone ? 'Тренировка выполнена' : 'Тренировка не выполнена'}
        width={24}
        height={24}
        priority
      />

      <div className={styles.info}>
        <h3>{parseTitle(item.name).title}</h3>
        <p>{parseTitle(item.name).subtitle}</p>
      </div>
    </li>
  )
}

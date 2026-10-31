import { WorkoutProgress } from '@/sharedTypes/ProgressType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import parseTitle from '@/utils/parseTitle'
import cn from 'classnames'
import Image from 'next/image'
import styles from './selectItem.module.css'

type SelectItemProps = {
  item: WorkoutType
  userProgress?: WorkoutProgress
  onClick: (name: string) => void
  isSelected: boolean
}

export default function SelectItem({
  item,
  userProgress,
  onClick,
  isSelected,
}: SelectItemProps) {
  const isDone = userProgress?.workoutCompleted

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

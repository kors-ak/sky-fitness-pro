import { WorkoutType } from '@/sharedTypes/WorkoutType'
import styles from './selectItem.module.css'

type SelectItemProps = {
  item: WorkoutType
  onSelectWorkout: (name: string) => void
}

export default function SelectItem({ item, onSelectWorkout }: SelectItemProps) {
  return (
    <li className={styles.item} onClick={() => onSelectWorkout(item._id)}>
      {item.name}
    </li>
  )
}

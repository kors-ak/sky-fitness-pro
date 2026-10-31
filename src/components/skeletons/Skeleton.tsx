import cn from 'classnames'
import styles from './skeleton.module.css'

type SkeletonProps = {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn(styles.skeleton, className)} aria-hidden="true" />
}

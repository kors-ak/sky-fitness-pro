import cn from 'classnames'
import styles from './courseCardSkeleton.module.css'

type CourseCardSkeletonProps = {
  isProfileCourse?: boolean
}

export default function CourseCardSkeleton({
  isProfileCourse = false,
}: CourseCardSkeletonProps) {
  return (
    <div className={styles.card}>
      <div className={cn(styles.block, styles.image)} />

      <div className={styles.content}>
        <div className={cn(styles.block, styles.heading)} />

        <div className={styles.info}>
          <div className={cn(styles.block, styles.tag)} />
          <div className={cn(styles.block, styles.tag)} />
          <div className={cn(styles.block, styles.tag)} />
        </div>

        {isProfileCourse && (
          <div className={styles.progress_container}>
            <div className={cn(styles.block, styles.progress_text)} />
            <div className={cn(styles.block, styles.progress)} />
            <div className={cn(styles.block, styles.progress_btn)} />
          </div>
        )}
      </div>
    </div>
  )
}

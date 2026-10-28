import { WorkoutType } from '@/sharedTypes/WorkoutType'

export default function sortTitles(array: WorkoutType[]) {
  const hasOne = array.some((item) => item.name.includes('1'))

  if (!hasOne) return array

  return [...array].sort((a, b) => {
    const numberA = a.name.match(/\d+/)
    const numberB = b.name.match(/\d+/)

    const valueA = numberA ? Number(numberA[0]) : Infinity
    const valueB = numberB ? Number(numberB[0]) : Infinity

    return valueA - valueB
  })
}

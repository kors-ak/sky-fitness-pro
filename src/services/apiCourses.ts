import { CourseType } from '@/sharedTypes/CourseType'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import { UserInfoType } from '@/sharedTypes/UserInfoType'
import { WorkoutType } from '@/sharedTypes/WorkoutType'
import { request } from './constants'

export const getAllCourses = async (): Promise<CourseType[]> => {
  return request<CourseType[]>('GET', '/courses', undefined, undefined, 3600)
}

export const getUserInfo = async (): Promise<UserInfoType> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<UserInfoType>('GET', '/users/me', undefined, token)
}

export const addUserCourse = async (courseId: string): Promise<string> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<string>(
    'POST',
    '/users/me/courses',
    {
      courseId: courseId,
    },
    token
  )
}

export const removeUserCourse = async (courseId: string): Promise<string> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<string>('DELETE', `/users/me/courses/${courseId}`, null, token)
}

export const getCourseWorkouts = async (
  courseId: string
): Promise<WorkoutType[]> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<WorkoutType[]>(
    'GET',
    `/courses/${courseId}/workouts`,
    null,
    token,
    3600
  )
}

export const getUserCourseProgress = async (
  courseId: string
): Promise<CourseProgress> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<CourseProgress>(
    'GET',
    `/users/me/progress?courseId={${courseId}}`,
    null,
    token
  )
}

export const removeUserCourseProgress = async (
  courseId: string
): Promise<string> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Токен авторизации не найден')
  }

  return request<string>('PATCH', `/courses/${courseId}/reset`, null, token)
}

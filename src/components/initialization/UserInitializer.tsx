'use client'

import {
  setToken,
  setUserEmail,
  setUserInitialized,
} from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'

export default function UserInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const email = localStorage.getItem('email') || ''
    const token = localStorage.getItem('token') || ''

    dispatch(setUserEmail(email))
    dispatch(setToken(token))
    dispatch(setUserInitialized(true))
  }, [dispatch])

  return null
}

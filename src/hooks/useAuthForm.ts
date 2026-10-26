'use client'

import {
  validateLogin,
  validatePassword,
  validateSecondPassword,
} from '@/utils/validation'
import { ChangeEvent, useState } from 'react'

type AuthErrors = {
  email: string
  password: string
  secondPassword: string
}

type AuthFormMode = 'sign-in' | 'sign-up'

const initialErrors: AuthErrors = {
  email: '',
  password: '',
  secondPassword: '',
}

export function useAuthForm(mode: AuthFormMode) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')

  const [errors, setErrors] = useState<AuthErrors>(initialErrors)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    setApiError('')

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        email: validateLogin(value),
      }))
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    setApiError('')

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
        ...(mode === 'sign-up' && secondPassword
          ? {
              secondPassword: validateSecondPassword(secondPassword, value),
            }
          : {}),
      }))
    }
  }

  const handleSecondPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSecondPassword(value)
    setApiError('')

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        secondPassword: validateSecondPassword(value, password),
      }))
    }
  }

  const validateForm = () => {
    setIsSubmitted(true)

    const newErrors: AuthErrors = {
      email: validateLogin(email),
      password: validatePassword(password),
      secondPassword:
        mode === 'sign-up'
          ? validateSecondPassword(secondPassword, password)
          : '',
    }

    setErrors(newErrors)

    return !newErrors.email && !newErrors.password && !newErrors.secondPassword
  }

  return {
    email,
    password,
    secondPassword,
    errors,
    apiError,
    setApiError,
    isLoading,
    setIsLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSecondPasswordChange,
    validateForm,
  }
}

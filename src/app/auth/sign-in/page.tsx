'use client'

import { useAuthForm } from '@/hooks/useAuthForm'
import { loginUser } from '@/services/apiAuth'
import { handleAuthError } from '@/services/errorHandling'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function SignUpPage() {
  const router = useRouter()

  const {
    email,
    password,
    errors,
    apiError,
    setApiError,
    isLoading,
    setIsLoading,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
  } = useAuthForm('sign-in')

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await loginUser({
        email,
        password,
      })

      router.push('/')
    } catch (error) {
      handleAuthError(error, setApiError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <h1 className={styles.visuallyHidden}>Вход</h1>

      <div className={styles.container}>
        <label className={styles.visuallyHidden} htmlFor="email">
          Логин
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Логин"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label className={styles.visuallyHidden} htmlFor="password">
          Пароль
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        {apiError && <p className={styles.error}>{apiError}</p>}
      </div>

      <div className={styles.container}>
        <button
          type="submit"
          className={cn(styles.btn, styles.mainBtn, {
            [styles.loading]: isLoading,
          })}
        >
          Войти
        </button>
        <Link
          href={'/auth/sign-up'}
          className={cn(styles.btn, styles.secondBtn, {
            [styles.loading]: isLoading,
          })}
        >
          Зарегистрироваться
        </Link>
      </div>
    </form>
  )
}

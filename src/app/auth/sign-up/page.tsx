'use client'

import { useAuthForm } from '@/hooks/useAuthForm'
import { signupUser } from '@/services/apiAuth'
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
  } = useAuthForm('sign-up')

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await signupUser({
        email,
        password,
      })

      router.push('/auth/sign-in')
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
      <h1 className={styles.visuallyHidden}>Регистрация</h1>

      <div className={styles.container}>
        <label className={styles.visuallyHidden} htmlFor="email">
          Эл. почта
        </label>
        <input
          className={cn(styles.input, {
            [styles.inputError]: Boolean(
              errors.email || apiError.includes('почта')
            ),
          })}
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Эл. почта"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label className={styles.visuallyHidden} htmlFor="password">
          Пароль
        </label>
        <input
          className={cn(styles.input, {
            [styles.inputError]: Boolean(errors.password),
          })}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label className={styles.visuallyHidden} htmlFor="confirmPassword">
          Повторите пароль
        </label>
        <input
          className={cn(styles.input, {
            [styles.inputError]: Boolean(errors.secondPassword),
          })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Повторите пароль"
          value={secondPassword}
          onChange={handleSecondPasswordChange}
          required
        />
        {errors.secondPassword && (
          <p className={styles.error}>{errors.secondPassword}</p>
        )}

        {apiError && <p className={styles.error}>{apiError}</p>}
      </div>

      <div className={styles.container}>
        <button
          type="submit"
          className={cn(styles.btn, styles.mainBtn, {
            [styles.loading]: isLoading,
          })}
          disabled={isLoading}
        >
          Зарегистрироваться
        </button>
        <Link
          href={'/auth/sign-in'}
          className={cn(styles.btn, styles.secondBtn, {
            [styles.loading]: isLoading,
          })}
        >
          Войти
        </Link>
      </div>
    </form>
  )
}

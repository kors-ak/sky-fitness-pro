export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateSignInEmail = (value: string) =>
  value.trim() ? '' : 'Введите почту'

export const validateSignInPassword = (value: string) =>
  value ? '' : 'Введите пароль'

export const validateLogin = (value: string) => {
  const emailValue = value.trim()

  if (!emailValue) return 'Введите почту'

  if (!EMAIL_REGEX.test(emailValue)) {
    return 'Проверьте формат почты'
  }

  return ''
}

export const validatePassword = (value: string) => {
  if (!value.trim()) return 'Введите пароль'

  if (value.length < 6) {
    return 'Минимум 6 символов'
  }

  if ((value.match(/[^\p{L}\p{N}\s]/gu) ?? []).length < 2) {
    return 'Минимум 2 спецсимвола'
  }

  if (!/\p{Lu}/u.test(value)) {
    return 'Минимум 1 заглавная буква'
  }

  return ''
}

export const validateSecondPassword = (
  value: string,
  firstPassword: string
) => {
  if (!value.trim()) return 'Повторите пароль'

  if (value !== firstPassword) {
    return 'Пароли не совпадают'
  }

  return ''
}

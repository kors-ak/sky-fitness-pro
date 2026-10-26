export const EMAIL_REGEX = /^[^\s@]{2,}@[^.\s@]+(?:\.[^.\s@]+)+$/

export const validateLogin = (value: string) => {
  const emailValue = value.trim()

  if (!emailValue) return 'Введите почту'

  if (!EMAIL_REGEX.test(emailValue)) {
    return 'Проверьте формат почты'
  }

  return ''
}

export const validatePassword = (value: string) => {
  const password = value.trim()

  if (!password) return 'Введите пароль'

  if (password.length < 6) {
    return 'Минимум 6 символов'
  }

  if ((password.match(/[^a-zA-Zа-яА-Я0-9]/g) ?? []).length < 2) {
    return 'Минимум 2 спецсимвола'
  }

  if (!/[A-ZА-Я]/.test(password)) {
    return 'Минимум 1 заглавная буква'
  }

  return ''
}

export const validateSecondPassword = (
  value: string,
  firstPassword: string
) => {
  const password = value.trim()

  if (!password) return 'Повторите пароль'

  if (password !== firstPassword) {
    return 'Пароли не совпадают'
  }

  return ''
}

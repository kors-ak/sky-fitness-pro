export const handleAuthError = (
  error: unknown,
  callback: (message: string) => void
) => {
  if (error instanceof Response) {
    if (error.status === 401) {
      callback('Неверная почта или пароль')
      return
    }

    callback('Что-то пошло не так, попробуйте позже')
    return
  }

  if (error instanceof TypeError) {
    callback('Нет подключения к интернету')
    return
  }

  if (error instanceof Error) {
    callback(error.message || 'Не удалось войти. Попробуйте позже')
    return
  }

  callback('Не удалось войти. Попробуйте позже')
}

export const handleFetchError = (error: unknown): string => {
  if (error instanceof TypeError) {
    return 'Проверьте подключение к сети и повторите попытку'
  }

  if (error instanceof Error) {
    return error.message || 'Что-то пошло не так, повторите попытку'
  }

  return 'Возникла неизвестная ошибка, повторите попытку'
}

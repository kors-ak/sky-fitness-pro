export const BASE_URL = 'https://wedev-api.sky.pro/api/fitness'

export const REFRESH_TIMEOUT = 1000 * 60 * 60

export const request = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result?.error ||
        result?.message ||
        'Что-то пошло не так, попробуйте позже'
    )
  }

  return result as T
}

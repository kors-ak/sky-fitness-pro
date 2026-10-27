export const BASE_URL = 'https://wedev-api.sky.pro/api/fitness'

export const request = async <T>(
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
  url: string,
  data?: unknown,
  token?: string,
  revalidate?: number
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(data !== undefined && {
      body: JSON.stringify(data),
    }),
    ...(revalidate !== undefined && {
      next: { revalidate },
    }),
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

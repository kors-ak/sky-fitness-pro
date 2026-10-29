export function getVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1) || null
    }

    if (
      parsedUrl.hostname === 'youtube.com' ||
      parsedUrl.hostname.endsWith('.youtube.com')
    ) {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v')
      }

      const match = parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)

      return match?.[1] ?? null
    }

    return null
  } catch {
    return null
  }
}

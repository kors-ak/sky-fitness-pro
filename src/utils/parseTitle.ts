type ParsedTitle = {
  title: string
  subtitle: string
}

export default function parseTitle(value: string): ParsedTitle {
  const parts = value.split(' / ')

  if (parts.length === 1) {
    return {
      title: value,
      subtitle: '',
    }
  }

  return {
    title: parts[0],
    subtitle: parts.slice(1, -1).join(' / '),
  }
}

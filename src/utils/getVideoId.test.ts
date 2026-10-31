import { getVideoId } from './getvideoId'

describe('getVideoId', () => {
  describe('YouTube watch URL', () => {
    it('Извлекает id из url', () => {
      expect(getVideoId('https://www.youtube.com/watch?v=abc123')).toBe(
        'abc123'
      )
    })

    it('Возвращает null, если нет id', () => {
      expect(getVideoId('https://www.youtube.com/watch')).toBeNull()
    })
  })

  describe('YouTube embed URL', () => {
    it('Извлекает id из url', () => {
      expect(getVideoId('https://www.youtube.com/embed/abc123')).toBe('abc123')
    })

    it('Извлекает id из url shorts', () => {
      expect(getVideoId('https://www.youtube.com/shorts/abc123')).toBe('abc123')
    })
  })

  describe('Невалидные URLs', () => {
    it('Возвращает null, если передана ссылка не на YouTube', () => {
      expect(getVideoId('https://vimeo.com/abc123')).toBeNull()
    })

    it('Возвращает null, если передана не ссылка', () => {
      expect(getVideoId('not-a-url')).toBeNull()
    })

    it('Возвращает null, если передана пустая строка', () => {
      expect(getVideoId('')).toBeNull()
    })
  })
})

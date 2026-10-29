import { cutAfterBracket } from './cutAfterBracket '

describe('cutAfterBracket', () => {
  it('Оставляет только текст до первой открывающейся скобки', () => {
    expect(cutAfterBracket('Название (дополнительно)')).toBe('Название')
  })

  it('Удаляет пробелы перед скобкой', () => {
    expect(cutAfterBracket('Название   (дополнительно)')).toBe('Название')
  })

  it('Удаляет лишние пробелы, когда нет скобок', () => {
    expect(cutAfterBracket('  Название  ')).toBe('Название')
  })

  it('Возвращает текст без изменений, если они не требуются', () => {
    expect(cutAfterBracket('Название')).toBe('Название')
  })

  it('При вводе пустой строки возвращает пустую строку', () => {
    expect(cutAfterBracket('')).toBe('')
  })

  it('Возвращает пустую строку, если значение начинается со скобки', () => {
    expect(cutAfterBracket('(дополнительно) Название')).toBe('')
  })
})

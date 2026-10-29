import {
  validateLogin,
  validatePassword,
  validateSecondPassword,
} from './validation'

describe('validateLogin', () => {
  it('Обрабатывает валидную почту', () => {
    expect(validateLogin('test@example.com')).toBe('')
  })

  it('Возвращает ошибку при пустой почте', () => {
    expect(validateLogin('')).toBe('Введите почту')
    expect(validateLogin('   ')).toBe('Введите почту')
  })

  it('Возвращает ошибку при невалидной почте', () => {
    expect(validateLogin('invalid-email')).toBe('Проверьте формат почты')
    expect(validateLogin('test@')).toBe('Проверьте формат почты')
    expect(validateLogin('@example.com')).toBe('Проверьте формат почты')
  })
})

describe('validatePassword', () => {
  it('Обрабатывает валидный пароль', () => {
    expect(validatePassword('Abc123!!')).toBe('')
  })

  it('Обрабатывает валидные пароли с кириллицей', () => {
    expect(validatePassword('Абв123!!')).toBe('')
  })

  it('Возвращает отшибку при пустом пароле', () => {
    expect(validatePassword('')).toBe('Введите пароль')
    expect(validatePassword('   ')).toBe('Введите пароль')
  })

  it('Не пропускает пароль короче 6 символов', () => {
    expect(validatePassword('Ab!12')).toBe('Минимум 6 символов')
  })

  it('Не пропускает пароль без минимум двух спецсимволов', () => {
    expect(validatePassword('Abc123!')).toBe('Минимум 2 спецсимвола')
  })

  it('Не пропускает пароль без заглавной буквы', () => {
    expect(validatePassword('abc123!!')).toBe('Минимум 1 заглавная буква')
  })
})

describe('validateSecondPassword', () => {
  it('Проверяет одинаковые пароли', () => {
    expect(validateSecondPassword('Abc123!!', 'Abc123!!')).toBe('')
  })

  it('Возвращает ошибку при пустом пароле', () => {
    expect(validateSecondPassword('', 'Abc123!!')).toBe('Повторите пароль')
    expect(validateSecondPassword('   ', 'Abc123!!')).toBe('Повторите пароль')
  })

  it('Возвращает ошибку, если пароли не совпадают ', () => {
    expect(validateSecondPassword('Abc123!!', 'Abc456!!')).toBe(
      'Пароли не совпадают'
    )
  })
})

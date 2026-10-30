import { loginUser, signupUser } from '@/services/apiAuth'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInPage from './sign-in/page'
import SignUpPage from './sign-up/page'

const mockPush = jest.fn()
const mockDispatch = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}))

jest.mock('@/services/apiAuth', () => ({
  loginUser: jest.fn(),
  signupUser: jest.fn(),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

async function fillSignIn(email: string, password: string) {
  const user = userEvent.setup()
  render(<SignInPage />)

  await user.type(screen.getByLabelText('Логин'), email)
  await user.type(screen.getByLabelText('Пароль'), password)
  await user.click(screen.getByRole('button', { name: 'Войти' }))

  return user
}

async function fillSignUp(email: string, password: string, repeat: string) {
  const user = userEvent.setup()
  render(<SignUpPage />)

  await user.type(screen.getByLabelText('Эл. почта'), email)
  await user.type(screen.getByLabelText('Пароль'), password)
  await user.type(screen.getByLabelText('Повторите пароль'), repeat)
  await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

  return user
}

describe('Форма входа', () => {
  it('Показывает ошибку, если почта в неверном формате', async () => {
    await fillSignIn('user@mail', 'Abcdef!!')

    expect(screen.getByText('Проверьте формат почты')).toBeInTheDocument()
    expect(loginUser).not.toHaveBeenCalled()
  })

  it.each([
    ['abc', 'Минимум 6 символов'],
    ['abcdef', 'Минимум 2 спецсимвола'],
    ['abcdef!!', 'Минимум 1 заглавная буква'],
  ])('Подсказывает, почему пароль не подходит', async (password, message) => {
    await fillSignIn('user@mail.ru', password)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(loginUser).not.toHaveBeenCalled()
  })

  it('Убирает ошибку, когда пароль исправлен', async () => {
    const user = await fillSignIn('user@mail.ru', 'abc')
    expect(screen.getByText('Минимум 6 символов')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Пароль'))
    await user.type(screen.getByLabelText('Пароль'), 'Abcdef!!')

    expect(screen.queryByText(/Минимум/)).not.toBeInTheDocument()
  })

  it('При успешном входе переходит на главную', async () => {
    jest.mocked(loginUser).mockResolvedValue({ token: 'token-123' })

    await fillSignIn('user@mail.ru', 'Abcdef!!')

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'))
  })
})

describe('Форма регистрации', () => {
  it('Показывает ошибку, если пароли не совпадают', async () => {
    await fillSignUp('user@mail.ru', 'Abcdef!!', 'Abcdef!?')

    expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument()
    expect(signupUser).not.toHaveBeenCalled()
  })

  it('после регистрации открывает страницу входа', async () => {
    jest.mocked(signupUser).mockResolvedValue({ message: 'ok' })

    await fillSignUp('user@mail.ru', 'Abcdef!!', 'Abcdef!!')

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/auth/sign-in'))
  })
})

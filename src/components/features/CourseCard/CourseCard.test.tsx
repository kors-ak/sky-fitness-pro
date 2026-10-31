import { CourseType, UserCourseType } from '@/sharedTypes/CourseType'
import { CourseProgress } from '@/sharedTypes/ProgressType'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CourseCard from './CourseCard'

type MockState = {
  courses: {
    moveCourseIsLoading: boolean
    userCourses: UserCourseType[]
    userProgress: CourseProgress[]
  }
}

const mockPush = jest.fn()
const mockAddCourse = jest.fn()
const mockRemoveCourse = jest.fn()
let mockProgress = 0
let mockState: MockState

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('@/store/hooks', () => ({
  useAppSelector: (selector: (state: MockState) => unknown) =>
    selector(mockState),
}))

jest.mock('@/hooks/useCourses', () => ({
  useCourses: () => ({
    addCourse: mockAddCourse,
    removeCourse: mockRemoveCourse,
  }),
}))

jest.mock('@/hooks/useCourseProgress', () => ({
  useCourseProgress: () => ({ progress: mockProgress, isLoading: false }),
}))

jest.mock('@/hooks/useProgress', () => ({
  useProgress: () => ({ removeCourseProgress: jest.fn() }),
}))

const course: CourseType = {
  _id: 'ab1c2d',
  order: 1,
  nameRU: 'Йога',
  nameEN: 'Yoga',
  description: 'Описание курса',
  directions: ['Йога для новичков'],
  fitting: ['Хотите расслабиться'],
  difficulty: 'начальный',
  durationInDays: 25,
  dailyDurationInMinutes: { from: 20, to: 50 },
  workouts: [],
  __v: 0,
}

beforeEach(() => {
  jest.clearAllMocks()
  mockProgress = 0
  mockState = {
    courses: { moveCourseIsLoading: false, userCourses: [], userProgress: [] },
  }
})

describe('CourseCard', () => {
  it('Показывает название, длительность и уровень сложности', () => {
    render(<CourseCard course={course} isProfileCourse={false} />)

    expect(screen.getByRole('heading', { name: 'Йога' })).toBeInTheDocument()
    expect(screen.getByText('25 дней')).toBeInTheDocument()
    expect(screen.getByText('20-50 мин/день')).toBeInTheDocument()
    expect(screen.getByText('Сложность')).toBeInTheDocument()
  })

  it('На главной не показывает блок прогресса', () => {
    render(<CourseCard course={course} isProfileCourse={false} />)

    expect(screen.queryByText(/Прогресс/)).not.toBeInTheDocument()
  })

  it.each([
    [0, 'Начать тренировки'],
    [40, 'Продолжить'],
    [100, 'Начать заново'],
  ])(
    'В профиле название кнопки меняется от выполнения курса',
    (progress, text) => {
      mockProgress = progress

      render(<CourseCard course={course} isProfileCourse={true} />)

      expect(screen.getByText(`Прогресс ${progress}%`)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: text })).toBeInTheDocument()
    }
  )

  it('Клик по карточке открывает страницу курса', async () => {
    const user = userEvent.setup()
    render(<CourseCard course={course} isProfileCourse={false} />)

    await user.click(screen.getByRole('article'))

    expect(mockPush).toHaveBeenCalledWith('/course/yoga')
  })

  it('Клик по кнопке «Добавить» не открывает страницу курса', async () => {
    const user = userEvent.setup()
    render(<CourseCard course={course} isProfileCourse={false} />)

    await user.click(screen.getByRole('button', { name: 'Добавить курс' }))

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('Совпадает со снапшотом', () => {
    mockProgress = 40
    const { asFragment } = render(
      <CourseCard course={course} isProfileCourse={true} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})

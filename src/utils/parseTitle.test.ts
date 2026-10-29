import parseTitle from './parseTitle'

describe('parseTitle', () => {
  it('Не разбивает без слэша', () => {
    expect(parseTitle('Название')).toEqual({
      title: 'Название',
      subtitle: '',
    })
  })

  it('Корректно работает с одним слэшем', () => {
    expect(parseTitle('Название / Подзаголовок')).toEqual({
      title: 'Название',
      subtitle: '',
    })
  })

  it('Корректно извлекает второе название, если слэшей больше одного', () => {
    expect(parseTitle('Название / Подзаголовок / Дополнение')).toEqual({
      title: 'Название',
      subtitle: 'Подзаголовок',
    })
  })

  it('Обрабатывает пустую строку', () => {
    expect(parseTitle('')).toEqual({
      title: '',
      subtitle: '',
    })
  })
})

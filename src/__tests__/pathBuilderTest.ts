import { Filter } from '../redux/types'
import { buildQueryParams } from '../utils/pathBuilder'

const getEmptyFilter = (): Filter => ({
  name: '',
  tags: '',
  orderBy: '',
})

test('Test build query params with empty filter', () => {
  const filter: Filter = getEmptyFilter()
  expect(buildQueryParams(filter)).toBe('')
})

test('Test build query params with only sorting', () => {
  const filter: Filter = getEmptyFilter()
  filter.orderBy = 'name asc'
  expect(buildQueryParams(filter)).toBe('?orderBy=name%20asc')
  filter.orderBy = 'name desc'
  expect(buildQueryParams(filter)).toBe('?orderBy=name%20desc')
  filter.orderBy = 'tags asc'
  expect(buildQueryParams(filter)).toBe('?orderBy=tags%20asc')
  filter.orderBy = 'tags desc'
  expect(buildQueryParams(filter)).toBe('?orderBy=tags%20desc')
})

test('Test build query params only one criteria', () => {
  const filter: Filter = getEmptyFilter()
  filter.name = 'mongo'
  expect(buildQueryParams(filter)).toBe('?name=mongo')
  filter.name = 'awesome event'
  expect(buildQueryParams(filter)).toBe('?name=awesome%20event')
  filter.name = 'most awesome event in the entire world ever'
  expect(buildQueryParams(filter)).toBe(
    '?name=most%20awesome%20event%20in%20the%20entire%20world%20ever',
  )
  filter.name = '       ' // Empty spaces
  expect(buildQueryParams(filter)).toBe('')
  filter.name = '			' // Tabs
  expect(buildQueryParams(filter)).toBe('')
  filter.createdBy = 1234
  expect(buildQueryParams(filter)).toBe('?createdBy=1234')
})

test('Test build query params with all filters', () => {
  const filter: Filter = getEmptyFilter()
  filter.name = 'angular revolution'
  filter.tags = 'freedom,angular,fight'
  filter.orderBy = 'name desc'
  expect(buildQueryParams(filter)).toBe(
    '?name=angular%20revolution&tags=freedom,angular,fight&orderBy=name%20desc',
  )
})

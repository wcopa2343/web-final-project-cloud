import { getHttpStatusMessage } from '../redux/types'

describe('Get HTTP Status Messages Tests', () => {
  it('200 Message', () => {
    expect(getHttpStatusMessage(200)).toBe('Ok')
  })
  it('201 Message', () => {
    expect(getHttpStatusMessage(201)).toBe('Created')
  })
  it('204 Message', () => {
    expect(getHttpStatusMessage(204)).toBe('No content found')
  })
  it('400 Message', () => {
    expect(getHttpStatusMessage(400)).toBe('Bad request')
  })
  it('401 Message', () => {
    expect(getHttpStatusMessage(401)).toBe('Unauthorized')
  })
  it('403 Message', () => {
    expect(getHttpStatusMessage(403)).toBe('Forbidden')
  })
  it('404 Message', () => {
    expect(getHttpStatusMessage(404)).toBe('Not found')
  })
  it('500 Message', () => {
    expect(getHttpStatusMessage(500)).toBe('Internal server Error')
  })
  it('Default Message', () => {
    expect(getHttpStatusMessage(98)).toBe('')
  })
})

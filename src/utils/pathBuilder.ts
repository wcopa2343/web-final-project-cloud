import { Filter } from '../redux/types'

export const buildQueryParams = (filter: Filter): string => {
  const rulesArray: string[] = []
  for (const field in filter) {
    const currentRule = buildRule(field, filter)
    if (currentRule) {
      rulesArray.push(currentRule)
    }
  }
  const hasRules = rulesArray.length > 0
  const queryMark = hasRules ? '?' : ''
  const rules = hasRules ? rulesArray.join('&') : ''
  return `${queryMark}${rules}`
}

const buildRule = (field: any, filter: any): string => {
  if (!filter[field]) {
    return ''
  } else if (typeof filter[field] === 'string') {
    return filter[field].trim()
      ? `${field}=${filter[field].split(/ /gi).join('%20')}`
      : ''
  } else {
    return `${field}=${filter[field]}`
  }
}

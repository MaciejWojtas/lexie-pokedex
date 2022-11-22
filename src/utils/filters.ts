export const propertyMatchQuery = <T extends string, U extends Record<T, string>>(
  data: U[],
  property: T,
  query: string
) => data.filter((item) => item[property].includes(query))

export const propertyArrayMatchQueryArray = <T extends string, U extends Record<T, string[]>>(
  data: U[],
  property: T,
  queries: string[]
) => data.filter((item) => item[property].filter((property) => queries.includes(property)).length)

export const propertyMatchQueryArray = <T extends string, U extends Record<T, string>>(
  data: U[],
  property: T,
  queries: string[]
) => data.filter((item) => queries.includes(item[property]))

export type FilterFn<T> = (x: T) => T

export const recurseFiltering = <T extends unknown[]>(
  data: T,
  filterCallbacks: FilterFn<T>[]
): T => {
  if (filterCallbacks.length === 0) {
    return data
  }
  const filteredList = filterCallbacks[filterCallbacks.length - 1](data)
  filterCallbacks.pop()
  return recurseFiltering(filteredList, filterCallbacks)
}

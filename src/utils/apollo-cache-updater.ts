import { ApolloCache, QueryBaseOptions } from '@apollo/client'

type IUpdaterFunction<TData> = (data: TData) => TData

export type IUpdateCacheFn = (client: ApolloCache<any>, { data }: any) => void

interface IUpdateQuery<TData, TVariables> extends QueryBaseOptions<TVariables> {
  updater: IUpdaterFunction<TData>
}

export const createUpdater = (key: string, ...items: any[]) => (queryData: any) => {
  if (!queryData || !queryData[key]) {
    return null
  }

  const data = [
    ...queryData[key],
    ...items,
  ]

  return {
    ...queryData,
    [key]: data,
  }
}

interface IDeletedItem {
  _id: string
}

export const removeUpdater = (key: string, ...items: IDeletedItem[]) => (queryData: any) => {
  if (!queryData || !queryData[key]) {
    return null
  }

  const data = queryData[key]
    .filter((tr: any) => !items.map(item => item._id).find(_id => tr._id === _id))

  return {
    ...queryData,
    [key]: data,
  }
}

export const updateQuery = (client: ApolloCache<any>) => <TData, TVariables = any>(options: IUpdateQuery<TData, TVariables>) => {
  const queryData = client.readQuery<TData>(options)

  if (!queryData) {
    return
  }

  const data = options.updater(queryData)

  client.writeQuery({
    ...options,
    data,
  })
}

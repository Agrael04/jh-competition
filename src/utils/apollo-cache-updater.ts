import { DataProxy } from 'apollo-cache'

type IUpdaterFunction<TData> = (data: TData) => TData

interface IUpdateQuery<TData, TVariables> extends DataProxy.Query<TVariables> {
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

export const removeUpdater = (key: string, ...ids: string[]) => (queryData: any) => {
  if (!queryData || !queryData[key]) {
    return null
  }

  const data = queryData[key]
    .filter((tr: any) => !ids.find(_id => tr._id === _id))

  return {
    ...queryData,
    [key]: data,
  }
}

export const updateQuery = (client: DataProxy) => <TData, TVariables = any>(options: IUpdateQuery<TData, TVariables>) => {
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

import { DataProxy } from 'apollo-cache'

interface IUpdateQuery<TData, TVariables> extends DataProxy.Query<TVariables> {
  updater: (data: TData) => TData
}

export const updateCachedQuery = (client: DataProxy) => <TData, TVariables = any>(options: IUpdateQuery<TData, TVariables>) => {
  const queryData = client.readQuery<TData>(options)

  if (!queryData) {
    return
  }

  const updatedData = options.updater(queryData)

  client.writeQuery({
    ...options,
    data: updatedData,
  })
}

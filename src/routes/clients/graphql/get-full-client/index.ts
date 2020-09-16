import { useLazyQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_CLIENTS = loader('./query.gql')

export interface IClient {
  _id: string
  firstName?: string
  lastName?: string
  birthday?: string | Date
  phone?: string
  altPhone?: string
  communicationType: string[]
  questionaryNumber?: string
  source?: string
  rights?: Array<'ATTEND' | 'RECORD'>
  group?: string
  groupRole?: string
  level?: string
  specialConditions?: string
  __typename: string
}

export interface IGetClient {
  client: IClient
}

export const useGetClientQuery = () => {
  const [fn, result] = useLazyQuery<IGetClient>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    load: (_id: string) => fn({ variables: { _id } }),
    result,
  }
}

export default useGetClientQuery

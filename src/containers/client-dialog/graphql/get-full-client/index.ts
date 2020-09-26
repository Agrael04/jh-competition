import { useQuery } from '@apollo/react-hooks'
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

export const useGetClientQuery = (_id?: string) => {
  const result = useQuery<IGetClient>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
    variables: { _id },
    skip: !_id,
  })

  return result
}

export default useGetClientQuery

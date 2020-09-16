import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_CLIENTS = loader('./query.gql')

export interface IClient {
  _id: string
  firstName: string
  lastName: string
  birthday?: string
  phone: string
  altPhone?: string
  balance?: number
  communicationType: string[]
  specialConditions?: string
  group?: string
  groupRole?: string
}

export interface IGetClients {
  clients: IClient[]
}

export const useGetClientsQuery = () => {
  const result = useQuery<IGetClients>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetClientsQuery

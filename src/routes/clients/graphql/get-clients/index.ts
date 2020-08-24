import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_CLIENTS = loader('./query.gql')

export interface IClient {
  _id: string
  name: string
  surname: string
  birthday: string
  phone: string
  altPhone: string
  type: string
  balance: number
}

export interface IGetClients {
  users: IClient[]
}

export const useGetClientsQuery = () => {
  const result = useQuery<IGetClients>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetClientsQuery

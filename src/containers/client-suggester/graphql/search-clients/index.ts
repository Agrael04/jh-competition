import { useLazyQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_CLIENTS = loader('./query.gql')

export interface IClient {
  _id: string
  firstName: string
  lastName: string
  balance: number
}

export interface IGetClients {
  suggestedClients: IClient[]
}

export const useSearchClients = () => {
  const [search, res] = useLazyQuery<IGetClients>(GET_CLIENTS)

  return {
    search,
    res,
  }
}

export default useSearchClients

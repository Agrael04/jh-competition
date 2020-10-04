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
  visitedAt?: Date
}

export interface IGetClients {
  clients: IClient[]
}

// export enum SortBy {
//   fullNameAsc = 'FULLNAME_ASC',
//   fullNameDesc = 'FULLNAME_DESC',
//   birthdayAsc = 'BIRTHDAY_DESC',
//   birthdayDesc = 'BIRTHDAY_DESC',
//   visitedAtAsc = 'VISITEDAT_DESC',
//   visitedAtDesc = 'VISITEDAT_DESC',
//   balanceAsc = 'BALANCE_DESC',
//   balanceDesc = 'BALANCE_DESC',
// }

export const useGetClientsQuery = (sortBy?: string) => {
  const result = useQuery<IGetClients>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      sortBy: sortBy || 'FULLNAME_ASC',
    },
  })

  return result
}

export default useGetClientsQuery

import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { useSelector } from 'store'
import moment from 'moment'

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

export const useGetClientsQuery = () => {
  const activeOrder = useSelector(state => state.clients.page.activeOrder)
  const filters = useSelector(state => state.clients.page.filters)

  const minVisitedAt = filters.visitedAt ? moment(filters.visitedAt).startOf('month').utc().format() : null
  const maxVisitedAt = filters.visitedAt ? moment(filters.visitedAt).startOf('month').add(1, 'month').utc().format() : null

  const minBirthday = filters.age ? moment().subtract(filters.age.split('-')[1], 'years').utc().format() : null
  const maxBirthday = filters.age ? moment().subtract(filters.age.split('-')[0], 'years').utc().format() : null

  const maxBalance = filters.withDebt ? 0 : null

  const result = useQuery<IGetClients>(GET_CLIENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      minVisitedAt,
      maxVisitedAt,
      minBirthday,
      maxBirthday,
      maxBalance,
      sortBy: `${activeOrder.orderKey.toUpperCase()}_${activeOrder.direction.toUpperCase()}` || 'FULLNAME_ASC',
    },
  })

  return result
}

export default useGetClientsQuery

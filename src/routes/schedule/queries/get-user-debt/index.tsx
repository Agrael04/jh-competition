import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_USER_DEBT = loader('./query.gql')

export interface IGetContactDebt {
  payments: Array<{
    _id: string
  }>
}

export const useGetUserDebt = (contactId?: string) => {
  const result = useQuery<IGetContactDebt>(GET_USER_DEBT, {
    variables: { _id: contactId },
    skip: !contactId,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetUserDebt

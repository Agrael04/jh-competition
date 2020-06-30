import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const QUERY = loader('./query.gql')

export interface IGetGymsResponse {
  gyms: Array<{
    _id: string
    name: string
    __typename: string
  }>
}

export const useGetContactStatusQuery = () => {
  const result = useQuery<IGetGymsResponse>(QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactStatusQuery

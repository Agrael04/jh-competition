import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_TRAINERS = loader('./query.gql')

export interface IGetTrainersResponse {
  trainers: Array<{
    _id: string
    firstName: string
    lastName: string
    avatarSrc: string
    color: number
    __typename: string
  }>
}

export const useGetTrainersQuery = () => {
  const result = useQuery<IGetTrainersResponse>(GET_TRAINERS, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainersQuery

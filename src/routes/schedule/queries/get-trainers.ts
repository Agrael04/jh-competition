import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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

export const GET_TRAINERS = gql`
  query getTrainers{
    trainers {
      _id
      firstName
      lastName
      color
      avatarSrc
    }
  }
`

export const useGetTrainersQuery = (skip: boolean) => {
  const result = useQuery<IGetTrainersResponse>(GET_TRAINERS, { skip })

  return result
}

export default useGetTrainersQuery

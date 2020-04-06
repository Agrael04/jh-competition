import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetTrainersResponse {
  trainers: Array<{
    _id: string
    firstName: string
    lastName: string
    __typename: string
  }>
}

export const GET_TRAINERS = gql`
  query getTrainers{
    trainers {
      _id
      firstName
      lastName
    }
  }
`

export const useGetTrainingsQuery = () => {
  const result = useQuery<IGetTrainersResponse>(GET_TRAINERS)

  return result
}

export default useGetTrainingsQuery

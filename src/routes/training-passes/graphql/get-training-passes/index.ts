import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_TRAINING_PASSES = loader('./query.gql')

export interface IGetTrainingPasses {
  trainingPasss: Array<{
    _id: string
    type: 'universal' | 'no_trainer' | 'sport' | 'open'
    size: string
    capacity: number
    duration: number
    activation: number
    createdAt: Date
    price: number
    contact: {
      _id: string
      firstName: string
      lastName: string
    }
    __typename: string
  }>
  payments: Array<{
    _id: string
    amount: number
    date: Date
    gym: {
      _id: string
      name: string
      __typename: string
    }
    pass: {
      _id: string
      __typename: string
    }
    __typename: string
  }>
}

export const useGetTrainingPassesQuery = () => {
  const result = useQuery<IGetTrainingPasses>(GET_TRAINING_PASSES, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainingPassesQuery

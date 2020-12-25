import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

const GET_TRAINING_PASSES = loader('./query.gql')

export interface IGetContactRecords {
  trainingPasss: Array<{
    _id: string
    type: 'universal' | 'no_trainer' | 'sport' | 'open'
    size: string
    capacity: number
    duration: number
    activation: number
    createdAt: Date
    __typename: string
  }>
  payments: Array<{
    _id: string
    pass: {
      _id: string
    }
    amount: number
    date: Date
    __typename: string
  }>
}

export const useGetTrainingPassesQuery = () => {
  const variables = useSelector(state => ({
    _id: state.ui.dialogs.checkDialog.params.contact?.link,
  }))

  const result = useQuery<IGetContactRecords>(GET_TRAINING_PASSES, {
    variables,
    skip: !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainingPassesQuery

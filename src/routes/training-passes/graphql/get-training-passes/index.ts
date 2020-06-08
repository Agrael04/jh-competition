import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import IPassRow from '../../pass-row/pass'

const GET_TRAINING_PASSES = loader('./query.gql')

export interface IGetTrainingPasses {
  trainingPasss: IPassRow[]
  payments: any[]
}

export const useGetTrainingPassesQuery = () => {
  const result = useQuery<IGetTrainingPasses>(GET_TRAINING_PASSES, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainingPassesQuery

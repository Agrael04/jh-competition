import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import ICheckPass from '../../payments-block/payment-form/pass-select/pass'
import IPassPayment from '../../payments-block/payment-form/pass-select/payment'

import { useContext } from '../../context'

const GET_TRAINING_PASSES = loader('./query.gql')

export interface IGetContactRecords {
  trainingPasss: ICheckPass[]
  payments: IPassPayment[]
}

export const useGetTrainingPassesQuery = () => {
  const variables = useContext(s => ({
    _id: s.state?.params.contact?.link,
  }))

  const result = useQuery<IGetContactRecords>(GET_TRAINING_PASSES, {
    variables,
    skip: !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainingPassesQuery

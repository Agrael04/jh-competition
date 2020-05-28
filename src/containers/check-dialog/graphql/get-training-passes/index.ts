import { useSelector } from 'store'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import ICheckPass from '../../payments-block/payment-form/pass-select/pass'
import IPassPayment from '../../payments-block/payment-form/pass-select/payment'

const GET_TRAINING_PASSES = loader('./query.gql')

export interface IGetContactRecords {
  trainingPasss: ICheckPass[]
  payments: IPassPayment[]
}

export const useGetTrainingPassesQuery = () => {
  const variables = useSelector(state => ({
    _id: state.checkDialog.contact,
  }))

  const result = useQuery<IGetContactRecords>(GET_TRAINING_PASSES, {
    variables,
    skip: !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetTrainingPassesQuery

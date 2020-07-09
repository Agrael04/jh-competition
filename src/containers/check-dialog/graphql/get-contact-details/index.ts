import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import ICheckRecord from '../../records-block/record-item/record'
import ICheckPosition from '../../records-block/position-item/position'
import IRecord from '../../total-block/record'
import IHeaderContact from '../../header/contract'
import IPassFormContact from '../../pass-form/contact'
import IPaymentItem from '../../payments-block/payment-item/payment'
import ITotalPayment from '../../total-block/payment'
import ITotalPosition from '../../total-block/position'

const GET_CONTACT_DETAILS = loader('./query.gql')

export interface IGetContactDetails {
  trainingRecords: Array<ICheckRecord & IRecord>
  checkPositions: Array<ICheckPosition & ITotalPosition>
  payments: Array<IPaymentItem & ITotalPayment>
  user: IHeaderContact & IPassFormContact
}

export const useGetContactDetailsQuery = () => {
  const date = useSelector(state => state.checkDialog.params.activeDate)
  const gym = useSelector(state => state.checkDialog.params.activeGym)
  const _id = useSelector(state => state.checkDialog.params.contact?.link)

  const result = useQuery<IGetContactDetails>(GET_CONTACT_DETAILS, {
    variables: {
      date,
      gym,
      _id,
    },
    skip: !gym || !_id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

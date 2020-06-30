import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import ICheckRecord from '../../records-block/record-item/record'
import ICheckPosition from '../../records-block/position-item/position'
import IRecord from '../../total-block/record'
import IHeaderContact from '../../header/contract'
import IPassFormContact from '../../pass-form/contact'
import IPaymentItem from '../../payments-block/payment-item/payment'
import ITotalPayment from '../../total-block/payment'
import ITotalPosition from '../../total-block/position'

import { useContext } from '../../context'

const GET_CONTACT_DETAILS = loader('./query.gql')

export interface IGetContactDetails {
  trainingRecords: Array<ICheckRecord & IRecord>
  checkPositions: Array<ICheckPosition & ITotalPosition>
  payments: Array<IPaymentItem & ITotalPayment>
  user: IHeaderContact & IPassFormContact
}

export const useGetContactDetailsQuery = () => {
  const variables = useContext(s => ({
    date: s.state?.params.activeDate,
    gym: s.state?.params.activeGym,
    _id: s.state?.params.contact?.link,
  }))

  const result = useQuery<IGetContactDetails>(GET_CONTACT_DETAILS, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

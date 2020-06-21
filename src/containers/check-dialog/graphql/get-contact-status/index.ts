import { useSelector } from 'store'
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

const QUERY = loader('./query.gql')

export interface IGetContactDetails {
  trainingRecords: Array<ICheckRecord & IRecord>
  checkPositions: Array<ICheckPosition & ITotalPosition>
  payments: Array<IPaymentItem & ITotalPayment>
  user: IHeaderContact & IPassFormContact
}

export const useGetContactStatusQuery = () => {
  const variables = useSelector(state => {
    const date = new Date(state.schedule.page.activeDate)
    date.setMonth(date.getMonth() - 1)
    return ({
      date,
      gym: state.schedule.page.activeGym,
      _id: state.checkDialog.contact,
    })
  })

  const result = useQuery<IGetContactDetails>(QUERY, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactStatusQuery

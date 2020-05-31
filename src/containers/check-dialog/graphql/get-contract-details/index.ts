import { useSelector } from 'store'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import ICheckRecord from '../../records-block/record-item/record'
import IService from '../../total-block/record'
import IHeaderContact from '../../header/contract'
import IPassFormContact from '../../pass-form/contact-suggester/contact'
import IPaymentItem from '../../payments-block/payment-item/payment'
import ITotalPayment from '../../total-block/payment'

const GET_CONTACT_DETAILS = loader('./query.gql')

export interface IGetContactDetails {
  trainingRecords: Array<ICheckRecord & IService>
  payments: Array<IPaymentItem & ITotalPayment>
  user: IHeaderContact & IPassFormContact
}

export const useGetContactDetailsQuery = () => {
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
  }))

  const result = useQuery<IGetContactDetails>(GET_CONTACT_DETAILS, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

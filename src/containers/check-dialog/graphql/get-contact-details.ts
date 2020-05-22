import { useSelector } from 'store'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import ICheckRecord from '../records-block/record'
import ICheckPass from '../payments-block/payment-form/pass-select/pass'
import IHeaderContact from '../header/contract'
import IPassFormContact from '../pass-form/contact-suggester/contact'

const GET_CONTACT_DETAILS = loader('./get-contact-details.gql')

export interface IGetContactRecords {
  trainingRecords: ICheckRecord[]
  trainingPasss: ICheckPass[]
  user: IHeaderContact & IPassFormContact
}

export const useGetContactDetailsQuery = () => {
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
  }))

  const result = useQuery<IGetContactRecords>(GET_CONTACT_DETAILS, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

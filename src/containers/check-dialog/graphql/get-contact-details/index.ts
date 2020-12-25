import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

const GET_CONTACT_DETAILS = loader('./query.gql')

interface ITrainingRecord {
  _id: string
  status: string
  training: {
    _id: string
    type: string
    name: string
    __typename: string
  }
  resource: {
    _id: string
    startTime: number
    endTime: number
    __typename: string
  }
  __typename: string
}

interface ICheckPosition {
  _id: string
  priceType: 'units' | 'money'
  priceAmount: number
  type: string
  service: string
  status: 'PENDING' | 'RESOLVED'
  __typename: string
}

interface IPayment {
  _id: string
  type: 'units' | 'money'
  pass?: {
    _id: string
  }
  createdAt: Date
  amount: number
  destination?: string
  transaction?: string
  status: 'PENDING' | 'RESOLVED'
  __typename: string
}

export interface IGetContactDetails {
  trainingRecords: ITrainingRecord[]
  checkPositions: ICheckPosition[]
  payments: IPayment[]
  client: {
    _id: string
    __typename: string
    firstName: string
    lastName: string
    balance: number | null
  }
}

export const useGetContactDetailsQuery = () => {
  const variables = useSelector(state => ({
    date: state.ui.dialogs.checkDialog.params.activeDate,
    gym: state.ui.dialogs.checkDialog.params.activeGym,
    _id: state.ui.dialogs.checkDialog.params.contact?.link,
  }))

  const result = useQuery<IGetContactDetails>(GET_CONTACT_DETAILS, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-only',
  })

  return result
}

export default useGetContactDetailsQuery

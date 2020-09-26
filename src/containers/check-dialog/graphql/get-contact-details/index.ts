import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

const GET_CONTACT_DETAILS = loader('./query.gql')

export interface IGetContactDetails {
  trainingRecords: Array<{
    _id: string
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
  }>
  checkPositions: Array<{
    _id: string
    priceType: 'units' | 'money'
    priceAmount: number
    type: string
    service: string
    __typename: string
  }>
  payments: Array<{
    _id: string
    type: 'units' | 'money'
    pass?: {
      _id: string
    }
    createdAt: Date
    amount: number
    destination?: string
    transaction?: string
    __typename: string
  }>
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
    date: state.checkDialog.params.activeDate,
    gym: state.checkDialog.params.activeGym,
    _id: state.checkDialog.params.contact?.link,
  }))

  const result = useQuery<IGetContactDetails>(GET_CONTACT_DETAILS, {
    variables,
    skip: !variables.gym || !variables._id,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

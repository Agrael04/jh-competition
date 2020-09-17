import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { useSelector } from 'store'

import ICheckPosition from '../../positions-block/position-item/position'
import ITotalPosition from '../../total-block/position'

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
  checkPositions: Array<ICheckPosition & ITotalPosition>
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

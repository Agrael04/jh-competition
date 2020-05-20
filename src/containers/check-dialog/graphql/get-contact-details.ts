import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetContactRecords {
  trainingRecords: Array<{
    _id: string
    __typename: string
    contact: {
      _id: string
      fullName: string
      __typename: string
    }
    training: {
      _id: string
      type: string
      name: string
      __typename: string
    }
  }>
  user: {
    _id: string
    __typename: string
    fullName: string
    phone: string
  }
}

const CONTACT_FRAGMENT = gql`
  fragment ContractFragment on User {
    _id
    fullName
    phone
  }
`

const RECORD_FRAGMENT = gql`
  fragment RecordFragment on TrainingRecord {
    _id
    resource {
      _id
      startTime
      endTime
    }
    training {
      _id
      type
      name
    }
  }
`

export const GET_CONTACT_RECORDS = gql`
  ${CONTACT_FRAGMENT}
  ${RECORD_FRAGMENT}
  query getContactDetails($date: DateTime, $gym: ObjectId, $_id: ObjectId){
    trainingRecords(query: {
      contact: {
        _id: $_id
      },
      training: {
        date: $date,
        gym: {
          _id: $gym
        }
      }
    }) {
      ...RecordFragment
    }
    user(query: { _id: $_id }) {
      ...ContractFragment
    }
  }
`

export const useGetContactDetailsQuery = (date: Date, gym: string, contactId: string | null) => {
  const result = useQuery<IGetContactRecords>(GET_CONTACT_RECORDS, {
    variables: { date, gym, _id: contactId },
    skip: !gym || !contactId,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactDetailsQuery

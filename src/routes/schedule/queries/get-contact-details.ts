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
    resource: {
      _id: string
      startTime: number
      endTime: number
      __typename: string
    }
    training: {
      _id: string
      type: string
      name: string
      __typename: string
    }
  }>
  trainingPasss: Array<{
    _id: string
    __typename: string
    contact: {
      _id: string
      fullName: string
      __typename: string
    }
    type: 'universal' | 'no_trainer' | 'child_sport' | 'adult_sport' | 'open'
    size: string
    capacity: number
    createdAt: Date
    activatedAt: Date
    activatesIn: Date
    expiresIn: Date
  }>
  user: {
    _id: string
    __typename: string
    fullName: string
    phoneNumber: string
  }
}

export const GET_CONTACT_RECORDS = gql`
  query getContactRecords($date: DateTime, $gym: ObjectId, $_id: ObjectId){
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
      _id
      contact {
        _id
        fullName
      }
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
    trainingPasss(query: {
      contact: {
        _id: $_id
      }
    }) {
      _id
      contact {
        _id
        fullName
      }
      type
      size
      capacity
      createdAt
      activatedAt
      activatesIn
      expiresIn
    }
    user(query: { _id: $_id }) {
      _id
      fullName
      phone
    }
  }
`

export const useGetContactDetailsQuery = (date: Date, gym: string, contactId: string) => {
  const result = useQuery<IGetContactRecords>(GET_CONTACT_RECORDS, {
    variables: { date, gym, _id: contactId },
    skip: !gym || !contactId,
  })

  return result
}

export default useGetContactDetailsQuery

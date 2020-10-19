import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetTrainingResponse {
  training: {
    _id: string
    __typename: string
    date: Date
    startTime: number
    endTime: number
    gym: {
      _id: string
    }

    name: string
    type: string
    traineesAmount: number
    note: string
  }
  trainingRecords: Array<{
    _id: string
    contact: {
      _id: string
      firstName: string
      lastName: string
      balance: number
      __typename: string
    }
    attendant: {
      _id: string
      firstName: string
      lastName: string
      __typename: string
    }
    resource: {
      _id: string
      __typename: string
    }
    training: {
      _id: string
      __typename: string
    }
    note: string
    status: string
    __typename: string
  }>
  trainingResources: Array<{
    _id: string
    __typename: string

    startTime: number
    endTime: number
    resource: {
      _id: string
      name: string
      __typename: string
    }
    trainer: {
      _id: string
      firstName: string
      lastName: string
      __typename: string
    }
    training: {
      _id: string
      __typename: string
    }
  }>
}

export const GET_TRAINING = gql`
  query getTraining($id: ObjectId){
    training(query: { _id: $id }) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }
      name
      type
      traineesAmount
      note
    }
    trainingResources(query: { training: { _id: $id }}) {
      _id
      startTime
      endTime
      resource {
        _id
        name
      }
      trainer {
        _id
        firstName
        lastName
      }
      training {
        _id
      }
    }
    trainingRecords(query: { training: { _id: $id }}) {
      _id
      contact {
        _id
        lastName
        firstName
        balance
      }
      attendant {
        _id
        lastName
        firstName
      }
      training {
        _id
      }
      resource {
        _id
      }
      note
      status
    }
  }
`

export const useGetTrainingQuery = (id: string | null | undefined, skip?: boolean) => {
  const result = useQuery<IGetTrainingResponse>(GET_TRAINING, {
    variables: { id },
    skip: !id || skip,
  })

  return result
}

export const convertTrainingResourceToInput = (r: IGetTrainingResponse['trainingResources'][0]) => ({
  _id: r._id,
  resource: { link: r.resource._id },
  trainer: r.trainer ? { link: r.trainer._id } : undefined,
  training: { link: r.training._id },
  startTime: r.startTime,
  endTime: r.endTime,
})

export const convertTrainingRecordToInput = (r: IGetTrainingResponse['trainingRecords'][0]) => ({
  _id: r._id,
  resource: { link: r.resource._id },
  training: { link: r.training._id },
  status: r.status,
  note: r.note,
  contact: r.contact ? {
    link: r.contact._id,
  } : undefined,
  attendant: r.attendant ? {
    link: r.attendant._id,
  } : undefined,
})

export default useGetTrainingQuery

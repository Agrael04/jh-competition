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
    traineesCount: number
    note: string
  }
  trainingRecords: Array<{
    _id: string
    contact: {
      _id: string
      fullName: string
      __typename: string
    }
    attendant: {
      _id: string
      fullName: string
      __typename: string
    }
    resource: {
      _id: string
      __typename: string
    }
    training: {
      _id: string
      fullName: string
      __typename: string
    }
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
      traineesCount
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
        fullName
      }
      attendant {
        _id
        fullName
      }
      training {
        _id
      }
      resource {
        _id
      }
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

export const convertTrainingToInput = (training: IGetTrainingResponse['training']) => ({
  _id: training._id,

  gym: { link: training.gym._id },
  date: training.date,
  startTime: training.startTime,
  endTime: training.endTime,

  name: training.name,
  type: training.type,
  traineesCount: training.traineesCount,
  note: training.note,
})

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
  contact: r.contact ? {
    link: r.contact._id,
  } : undefined,
  attendant: r.attendant ? {
    link: r.attendant._id,
  } : undefined,
})

export default useGetTrainingQuery

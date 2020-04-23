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

    resources: Array<{
      _id: string
      __typename: string

      startTime: number
      endTime: number
      resource: {
        _id: string
        __typename: string
      }
      trainer: {
        _id: string
        color: number
        avatarSrc: string
        __typename: string
      }
      records: Array<{
        _id: string
        __typename: string
      }>
    }>
    records: Array<{
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
      status: string
      __typename: string
    }>
  }
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
      resources {
        _id
        startTime
        endTime
        resource {
          _id
        }
        trainer {
          _id
          color
          avatarSrc
        }
        records {
          _id
        }
      }
      records {
        _id
        contact {
          _id
          fullName
        }
        attendant {
          _id
          fullName
        }
        status
      }
    }
  }
`

export const useGetTrainingQuery = (id: string | null | undefined, skip: boolean) => {
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

  resources: training.resources.map(r => ({
    _id: r._id,
    resource: { link: r.resource._id },
    trainer: r.trainer ? { link: r.trainer._id } : undefined,
    startTime: r.startTime,
    endTime: r.endTime,
    records: { link: r.records?.map(rec => rec._id) || [] },
  })),

  records: training.records.map(record => ({
    _id: record._id,
    status: record.status,
    contact: record.contact ? {
      link: record.contact._id,
      fullName: record.contact.fullName,
    } : undefined,
    attendant: record.attendant ? {
      link: record.attendant._id,
      fullName: record.attendant.fullName,
    } : undefined,
  })),
})

export default useGetTrainingQuery

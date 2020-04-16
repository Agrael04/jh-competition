import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetTrainingResponse {
  training: {
    _id: string
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
    __typename: string
  }
  // trainingRecords: Array<{
  //   seasonPass: string
  //   trainee: {
  //     _id: string
  //     fullName: string
  //     __typename: string
  //   }
  //   note: string
  //   status: string
  //   training: string
  //   __typename: string
  // }>
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
    # trainingRecords(query: { training: $id }) {
    #   seasonPass
    #   trainee {
    #     _id
    #     fullName
    #   }
    #   note
    #   status
    #   training
    # }
  }
`

export const useGetTrainingQuery = (id: string | null | undefined) => {
  const result = useQuery<IGetTrainingResponse>(GET_TRAINING, {
    variables: { id },
    skip: !id,
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

export default useGetTrainingQuery

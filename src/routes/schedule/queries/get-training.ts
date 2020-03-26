import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetTrainingResponse {
  training: {
    _id: string
    date: Date
    gym: number
    markPrice: number
    moneyPrice: number
    name: string
    note: string
    resource: number
    trainer: number
    type: string
    startTime: number
    endTime: number
  }
  trainingRecords: Array<{
    seasonPass: string
    trainee: {
      _id: string
      fullName: string
    }
    note: string
    status: string
    training: string
  }>
}

export const GET_TRAINING = gql`
  query getTraining($id: ObjectId){
    training(query: { _id: $id }) {
      _id
      date
      gym
      markPrice
      moneyPrice
      name
      note
      resource
      trainer
      type
      startTime
      endTime
    }
    trainingRecords(query: { training: $id }) {
      seasonPass
      trainee {
        _id
        fullName
      }
      note
      status
      training
    }
  }
`

export const useGetTrainingQuery = (id: string | undefined) => {

  const result = useQuery<IGetTrainingResponse>(GET_TRAINING, {
    variables: { id },
    skip: !id,
  })

  return result
}

export default useGetTrainingQuery

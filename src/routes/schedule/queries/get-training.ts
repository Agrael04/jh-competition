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
    trainer: {
      _id: string
      firstName: string
      lastName: string
      color: number
      avatarSrc: string
      __typename: string
    }
    type: string
    startTime: number
    endTime: number
    __typename: string
  }
  trainingRecords: Array<{
    seasonPass: string
    trainee: {
      _id: string
      fullName: string
      __typename: string
    }
    note: string
    status: string
    training: string
    __typename: string
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
      trainer {
        _id
        firstName
        lastName
        color
        avatarSrc
      }
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

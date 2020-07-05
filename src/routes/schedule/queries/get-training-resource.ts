import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetTrainingResourceResponse {
  trainingResource: {
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
      __typename: string
      color: number
      avatarSrc: string
    }
    training: {
      _id: string
      __typename: string
      type: string
    }
  }
  trainingRecords: Array<{
    _id: string
    __typename: string
    contact: {
      _id: string
      __typename: string
      fullName: string
    }
    status: string
  }>
}

export const GET_TRAINING_RESOURCE = gql`
  query getTrainingResource($id: ObjectId){
    trainingResource(query: { _id: $id }) {
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
      training {
        _id
        type
      }
    }
    trainingRecords(query: { resource: { _id: $id }}) {
      _id
      contact {
        _id
        fullName
      }
      status
    }
  }
`

export const useGetTrainingResourceQuery = (id: string | undefined | null) => {
  const result = useQuery<IGetTrainingResourceResponse>(GET_TRAINING_RESOURCE, {
    variables: { id },
    skip: !id,
  })

  return result
}

export const convertTrainingResourceToInput = (r: IGetTrainingResourceResponse['trainingResource']) => ({
  _id: r._id,
  resource: { link: r.resource._id },
  trainer: r.trainer ? { link: r.trainer._id } : undefined,
  training: { link: r.training._id },
  startTime: r.startTime,
  endTime: r.endTime,
})

export default useGetTrainingResourceQuery

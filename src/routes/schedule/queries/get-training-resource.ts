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
    records: Array<{
      _id: string
      __typename: string
      contact: {
        _id: string
        __typename: string
        fullName: string
      }
    }>
  }
}

export const GET_TRAINING_RESOURCE = gql`
  query getTrainingResource($_id: ObjectId){
    trainingResource(query: { _id: $_id }) {
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
        contact {
          fullName
        }
      }
    }
  }
`

export const useGetTrainingResourceQuery = (_id: string | undefined | null) => {
  const result = useQuery<IGetTrainingResourceResponse>(GET_TRAINING_RESOURCE, {
    variables: { _id },
    skip: !_id,
  })

  return result
}

export const convertResourcesToInput = (r: IGetTrainingResourceResponse['trainingResource']) => ({
  _id: r._id,

  resource: { link: r.resource._id },
  trainer: r.trainer ? { link: r.trainer._id } : undefined,
  startTime: r.startTime,
  endTime: r.endTime,
})

export default useGetTrainingResourceQuery

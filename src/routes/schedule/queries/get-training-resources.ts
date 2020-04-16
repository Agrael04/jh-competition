import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetTrainingResourcesResponse {
  trainingResources: Array<{
    _id: string
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
    training: {
      _id: string
      type: string
      __typename: string
    }
    __typename: string
  }>
}

export const GET_TRAINING_RESOURCES = gql`
  query getTrainingResources($date: DateTime){
    trainingResources(query: { date: $date }) {
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
  }
`

export const useGetTrainingResourcesQuery = () => {
  const date = useSelector(state => state.schedule.page.activeDate)

  const result = useQuery<IGetTrainingResourcesResponse>(GET_TRAINING_RESOURCES, {
    variables: { date },
  })

  return result
}

export const convertResourcesToInput = (resources: IGetTrainingResourcesResponse['trainingResources']) => resources.map(r => ({
  _id: r._id,

  resource: { link: r.resource._id },
  trainer: r.trainer ? { link: r.trainer._id } : undefined,
  startTime: r.startTime,
  endTime: r.endTime,
}))

export default useGetTrainingResourcesQuery

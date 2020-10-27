import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

interface ITrainingResource {
  _id: string
  startTime: number
  endTime: number
  __typename: string
  resource: {
    _id: string
    __typename: string
  }
  trainer: {
    _id: string
    __typename: string
  }
}

export interface IGetTrainingResourcesResponse {
  trainingResources: ITrainingResource[]
}

export const GET_TRAINING_RESOURCES = gql`
  query getTrainingResources($date: DateTime, $gym: ObjectId, $resources: [ObjectId]){
    trainingResources(query: {
      training: {
        date: $date
        gym: {
          _id: $gym
        }
      }
      resource: {
        _id_in: $resources
      }
    }) {
      _id
      startTime
      endTime
      resource {
        _id
      }
      trainer {
        _id
      }
    }
  }
`

export const useGetTrainingResourcesQuery = () => {
  const filters = useSelector(state => state.schedule.page.filters)

  const result = useQuery<IGetTrainingResourcesResponse>(GET_TRAINING_RESOURCES, {
    variables: {
      date: filters.date.toDate(),
      gym: filters.gym,
      resources: filters.resources,
    },
    skip: !filters.gym,
  })

  return result
}

export default useGetTrainingResourcesQuery

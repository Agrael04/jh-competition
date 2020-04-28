import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetTrainingResourcesResponse {
  trainingResources: Array<{
    _id: string
    startTime: number
    endTime: number
    __typename: string
    resource: {
      _id: string
      __typename: string
    }
  }>
}

export const GET_TRAINING_RESOURCES = gql`
  query getTrainingResources($date: DateTime){
    trainingResources(query: { training: { date: $date } }) {
      _id
      startTime
      endTime
      resource {
        _id
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

export default useGetTrainingResourcesQuery

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetTrainingResource {
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
  }
}

export interface IGetTrainingsResponse {
  trainings: Array<{
    _id: string
    __typename: string
    type: string
    resources: IGetTrainingResource[]
  }>
}

export const GET_TRAININGS = gql`
  query getTrainings($date: DateTime){
    trainings(query: { date: $date }) {
      _id
      type
      resources {
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
  }
`

export const useGetTrainingsQuery = () => {
  const date = useSelector(state => state.schedule.page.activeDate)

  const result = useQuery<IGetTrainingsResponse>(GET_TRAININGS, {
    variables: { date },
  })

  return result
}

export default useGetTrainingsQuery

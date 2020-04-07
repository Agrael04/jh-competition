import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetTrainingsResponse {
  trainings: Array<{
    _id: string
    resource: {
      _id: string
    }
    trainer: {
      _id: string
      firstName: string
      lastName: string
      color: number
      avatarSrc: string
    }
    startTime: number
    endTime: number
    __typename: string
  }>
}

export const GET_TRAININGS = gql`
  query getTrainings($date: DateTime){
    trainings(query: { date: $date }) {
      _id
      resource {
        _id
      }
      trainer {
        _id
        firstName
        lastName
        color
        avatarSrc
      }
      startTime
      endTime
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

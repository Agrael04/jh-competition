import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetSchedulesResponse {
  trainerSchedules: Array<{
    _id: string
    date: number
    time: number
    trainer: {
      _id: string
      avatarSrc: string
      color: number
      firstName: string
      lastName: string
    }
    gym: number
    __typename: string
  }>
}

export const GET_SCHEDULES = gql`
  query getTrainings($date: DateTime){
    trainerSchedules(query: { date: $date }) {
      _id
      date
      time
      trainer{
        _id
        avatarSrc
        color
        firstName
        lastName
      }
      gym
    }
  }
`

export const useGetTrainingsQuery = (date?: Date) => {
  const activeDate = useSelector(state => state.schedule.page.activeDate)

  const result = useQuery<IGetSchedulesResponse>(GET_SCHEDULES, {
    variables: { date: date || activeDate },
  })

  return result
}

export default useGetTrainingsQuery

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetSchedulesResponse {
  trainerSchedules: Array<{
    _id: string
    date: number
    time: number
    trainer: number
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
      trainer
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

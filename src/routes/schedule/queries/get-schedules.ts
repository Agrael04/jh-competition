import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

interface IQueryFilters {
  startTime?: number
  endTime?: number
  trainer?: string
  gym?: string
}

interface ITrainerSchedule {
  _id: string
  date: number
  time: number
  trainer: {
    _id: string
    avatarSrc: string
    color: number
    firstName: string
    lastName: string
    __typename: string
  }
  gym: {
    _id: string
    __typename: string
  }
  __typename: string
}

export interface IGetSchedulesResponse {
  trainerSchedules: ITrainerSchedule[]
}

export const GET_SCHEDULES = gql`
  query getSchedules($date: DateTime!, $startTime: Int, $endTime: Int, $trainer: ObjectId, $gym: ObjectId){
    trainerSchedules(query: {
      date: $date,
      time_gte: $startTime,
      time_lt: $endTime,
      trainer: { _id: $trainer },
      gym: { _id: $gym }
    }) {
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
      gym{
        _id
      }
    }
  }
`

export const useGetSchedulesQuery = (date?: Date, filters?: IQueryFilters) => {
  const activeDate = useSelector(state => state.schedule.page.filters.date)

  const result = useQuery<IGetSchedulesResponse>(GET_SCHEDULES, {
    variables: {
      date: date || activeDate,
      ...filters,
    },
  })

  return result
}

export const isTrainerAvailable = (schedules: ITrainerSchedule[], trainer: string, gym: string, startTime: number, endTime: number) => {
  return (
    schedules
      .filter(ts => ts.trainer._id === trainer && ts.gym._id === gym)
      .map(s => s.time)
      .filter(t => t >= startTime! && t < endTime!)
      .length === endTime! - startTime!
  )
}

export default useGetSchedulesQuery

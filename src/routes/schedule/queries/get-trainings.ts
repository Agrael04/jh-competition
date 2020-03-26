import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'

export interface IGetTrainingsResponse {
  trainings: Array<{
    _id: string
    resource: number
    trainer: number
    startTime: number
    endTime: number
  }>
}

export const GET_TRAININGS = gql`
  query getTrainings($date: DateTime, $gym: Int){
    trainings(query: { date: $date, gym: $gym }) {
      _id
      resource
      trainer
      startTime
      endTime
    }
  }
`

export const useGetTrainingsQuery = () => {
  const date = useSelector(state => state.schedule.currentDate)
  const gym = useSelector(state => state.schedule.currentGym)

  const result = useQuery<IGetTrainingsResponse>(GET_TRAININGS, {
    variables: { date, gym },
  })

  return result
}

export default useGetTrainingsQuery

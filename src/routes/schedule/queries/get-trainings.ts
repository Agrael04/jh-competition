import gql from 'graphql-tag'

export interface IGetTrainingsResponse {
  trainings: Array<{
    _id: string
    resource: number
    trainer: number
    startTime: number
    endTime: number
  }>
}

export default gql`
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
